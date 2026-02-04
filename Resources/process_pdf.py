import fitz  # PyMuPDF
import openai
from pinecone import Pinecone
import hashlib
from typing import List, Dict
import os
from dotenv import load_dotenv

load_dotenv("../.env")

# --- Configuration ---
openai.api_key = os.getenv("OPENAI_API_KEY")
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
pinecone_index = pc.Index(os.getenv("PINECONE_INDEX_NAME", "gear-ai-manuals"))
EMBEDDING_MODEL = "text-embedding-3-small"
CHUNK_SIZE = 400  # Target words per chunk
CHUNK_OVERLAP = 50 # Word overlap

def chunk_text(text: str, file_name: str) -> List[Dict]:
    """Splits text into overlapping chunks with metadata."""
    words = text.split()
    chunks = []
    for i in range(0, len(words), CHUNK_SIZE - CHUNK_OVERLAP):
        chunk_words = words[i:i + CHUNK_SIZE]
        chunk_text = " ".join(chunk_words)
        chunk_hash = hashlib.sha256(chunk_text.encode()).hexdigest()
        chunks.append({
            "id": f"{file_name}-{i}",
            "text": chunk_text,
            "metadata": {"source_file": file_name, "start_word": i, "chunk_hash": chunk_hash}
        })
    return chunks

def process_pdf(file_path: str, user_id: str, vehicle_id: str):
    """Full pipeline: extract, chunk, embed, and upsert a PDF."""
    print(f"Processing {file_path}...")
    doc = fitz.open(file_path)
    full_text = ""
    for page in doc:
        full_text += page.get_text()

    print(f"Extracted {len(full_text.split())} words.")
    
    file_name = os.path.basename(file_path)
    chunks = chunk_text(full_text, file_name)
    print(f"Created {len(chunks)} chunks.")

    # Generate embeddings in batches
    batch_size = 100
    for i in range(0, len(chunks), batch_size):
        batch_chunks = chunks[i:i + batch_size]
        texts_to_embed = [chunk["text"] for chunk in batch_chunks]
        
        print(f"Generating embeddings for batch {i//batch_size + 1}...")
        res = openai.embeddings.create(input=texts_to_embed, model=EMBEDDING_MODEL)
        embeddings = [record.embedding for record in res.data]

        # Prepare vectors for Pinecone
        vectors_to_upsert = []
        for j, chunk in enumerate(batch_chunks):
            vector_metadata = {
                "user_id": user_id,
                "vehicle_id": vehicle_id,
                **chunk["metadata"]
            }
            vectors_to_upsert.append({
                "id": chunk["id"],
                "values": embeddings[j],
                "metadata": vector_metadata
            })
        
        print(f"Upserting {len(vectors_to_upsert)} vectors to Pinecone...")
        pinecone_index.upsert(vectors=vectors_to_upsert)

    print(f"Successfully processed and indexed {file_path}.")

if __name__ == '__main__':
    # This is an example of how the script would be run
    # In production, this would be a background worker task.
    # process_pdf("path/to/your/manual.pdf", "user-id-123", "vehicle-id-456")
    print("PDF Processing Script is ready.")