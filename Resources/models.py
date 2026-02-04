from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class ChatRequest(BaseModel):
    """
    Defines the payload for a user's chat request.
    """
    user_id: str = Field(..., description="The internal UUID of the user.")
    vehicle_id: str = Field(..., description="The internal UUID of the vehicle being discussed.")
    message: str = Field(..., min_length=1, max_length=2000, description="The user's chat message.")
    thread_id: Optional[str] = Field(None, description="The ID of the conversation thread for context.")
    wallet_address: Optional[str] = Field(None, description="The user's Web3 wallet address for on-chain context retrieval.")

class ContextSource(BaseModel):
    """
    Represents a single source of information used to generate the AI response.
    """
    source_type: str = Field(..., description="Type of the source, e.g., 'manual', 'api', 'on-chain'.")
    source_name: str = Field(..., description="Name of the source, e.g., '2021_honda_accord_manual.pdf'.")
    content: str = Field(..., description="The actual text content from the source.")
    metadata: Dict[str, Any] = Field({}, description="Additional metadata, e.g., page number, contract address.")

class KnowledgeAttestation(BaseModel):
    """
    A cryptographically signed attestation of the AI's response.
    This object can be stored to provide a verifiable record of the information provided.
    As per oracle_web3 doctrine 2.1: "Trust, but verify with cryptography."
    """
    query: str
    response: str
    context_hashes: List[str]
    timestamp: str
    signature: str

class ChatResponse(BaseModel):
    """
    Defines the final response sent back to the user.
    """
    success: bool = True
    response_text: str
    sources: List[ContextSource]
    attestation: KnowledgeAttestation