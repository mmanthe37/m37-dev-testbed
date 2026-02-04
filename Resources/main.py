from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
import logging

from src.config import settings
from src.models import ChatRequest, ChatResponse, KnowledgeAttestation
from src.services.rag_service import rag_service

# --- Application Setup ---
app = FastAPI(
    title="Gear AI Chat Service",
    description="The AI/ML core for the Gear AI ecosystem, acting as a decentralized knowledge oracle.",
    version="1.0.0",
)

logging.basicConfig(level=settings.LOG_LEVEL)
logger = logging.getLogger(__name__)

# --- Middleware ---
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Incoming request: {request.method} {request.url.path}")
    response = await call_next(request)
    logger.info(f"Outgoing response: {response.status_code}")
    return response

# --- API Endpoints ---

@app.get("/health", tags=["Monitoring"])
async def health_check():
    """Provides a health check endpoint for monitoring."""
    return {"status": "UP", "service": settings.SERVICE_NAME}

@app.post("/chat", response_model=ChatResponse, tags=["AI"])
async def process_chat_message(request: ChatRequest):
    """
    The main endpoint for processing a user's chat message.
    This endpoint orchestrates the entire RAG and Attestation pipeline.
    """
    try:
        # 1. Generate embedding for the user's query
        query_embedding = await rag_service.get_embedding(request.message)

        # 2. Retrieve relevant context from the vector database
        # TODO: Add on-chain and external API context retrieval here
        context_sources = await rag_service.query_vector_db(
            embedding=query_embedding,
            user_id=request.user_id,
            vehicle_id=request.vehicle_id
        )

        if not context_sources:
            # Handle case where no context is found
            # We can either let the LLM say it doesn't know, or return a canned response.
            logger.warning(f"No context found for query: '{request.message}'")
            # For now, we proceed and let the LLM handle it based on the system prompt.
        
        # 3. Generate the final response using the LLM
        ai_response_text = await rag_service.generate_response(request.message, context_sources)

        # 4. Create the Knowledge Attestation
        context_hashes = sorted([hashlib.sha256(src.content.encode()).hexdigest() for src in context_sources])
        timestamp, signature, _ = rag_service.create_attestation(
            query=request.message,
            response=ai_response_text,
            context=context_sources
        )

        attestation = KnowledgeAttestation(
            query=request.message,
            response=ai_response_text,
            context_hashes=context_hashes,
            timestamp=timestamp,
            signature=signature,
        )

        return ChatResponse(
            response_text=ai_response_text,
            sources=context_sources,
            attestation=attestation,
        )

    except Exception as e:
        logger.exception("An error occurred during chat processing.")
        raise HTTPException(status_code=500, detail=f"An internal error occurred: {str(e)}")
