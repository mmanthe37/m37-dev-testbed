import openai
from pinecone import Pinecone
from typing import List, Tuple
import hashlib
import datetime
from eth_account import Account
from eth_account.messages import encode_defunct

from src.config import settings
from src.models import ContextSource

# --- Initialize Clients ---
openai.api_key = settings.OPENAI_API_KEY
pc = Pinecone(api_key=settings.PINECONE_API_KEY)
pinecone_index = pc.Index(settings.PINECONE_INDEX_NAME)

class RagService:
    """
    Orchestrates the entire Retrieval-Augmented Generation (RAG) pipeline.
    """

    async def get_embedding(self, text: str) -> List[float]:
        """Generates a vector embedding for a given text."""
        response = await openai.embeddings.create(
            input=[text],
            model=settings.OPENAI_EMBEDDING_MODEL
        )
        return response.data[0].embedding

    async def query_vector_db(self, embedding: List[float], user_id: str, vehicle_id: str, top_k: int = 5) -> List[ContextSource]:
        """Queries the Pinecone vector database to find relevant context."""
        response = pinecone_index.query(
            vector=embedding,
            top_k=top_k,
            filter={
                "user_id": {"$eq": user_id},
                "vehicle_id": {"$eq": vehicle_id}
            },
            include_metadata=True
        )
        
        sources: List[ContextSource] = []
        for match in response.get('matches', []):
            metadata = match.get('metadata', {})
            sources.append(ContextSource(
                source_type="manual",
                source_name=metadata.get("source_file", "Unknown Manual"),
                content=metadata.get("text", ""),
                metadata={"page": metadata.get("page_number"), "score": match.get("score")}
            ))
        return sources

    async def generate_response(self, query: str, context: List[ContextSource]) -> str:
        """Generates a final response from the LLM using the provided context."""
        
        system_prompt = """
        You are Gear AI, an expert automotive assistant. Your knowledge is absolute but confined to the context provided.
        Answer the user's query clearly and concisely.
        You MUST cite your sources by referencing the source name and any available metadata (like page numbers).
        If the context does not contain the answer, you MUST state that the information is not available in your current knowledge base.
        Do not invent information.
        """

        context_str = "\n\n---\n\n".join(
            f"Source: {src.source_name}, Page: {src.metadata.get('page')}\nContent: {src.content}"
            for src in context
        )

        user_prompt = f"""
        CONTEXT:
        {context_str}

        QUERY:
        {query}
        """

        response = await openai.chat.completions.create(
            model=settings.OPENAI_CHAT_MODEL,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.2,
        )
        return response.choices[0].message.content or "I am unable to provide a response at this time."

    def create_attestation(self, query: str, response: str, context: List[ContextSource]) -> Tuple[str, str, str]:
        """
        Creates a cryptographic signature of the query, response, and context.
        This is the core of the Knowledge Attestation mechanism.
        """
        timestamp = datetime.datetime.now(datetime.timezone.utc).isoformat()
        
        context_hashes = sorted([hashlib.sha256(src.content.encode()).hexdigest() for src in context])
        
        message_to_sign = f"""
        Gear AI Knowledge Attestation
        Timestamp: {timestamp}
        Query: {query}
        Response: {response}
        Context Hashes: {','.join(context_hashes)}
        """
        
        message_hash = encode_defunct(text=message_to_sign)
        signed_message = Account.from_key(settings.ATTESTATION_PRIVATE_KEY).sign_message(message_hash)
        
        return timestamp, signed_message.signature.hex(), message_to_sign

rag_service = RagService()