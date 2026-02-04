from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    """
    Manages all environment variables for the Chat Service.
    Loads from a .env file in development.
    """
    model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8')

    # Service Configuration
    SERVICE_NAME: str = "Gear AI Chat Service"
    LOG_LEVEL: str = "INFO"

    # OpenAI Configuration
    OPENAI_API_KEY: str
    OPENAI_EMBEDDING_MODEL: str = "text-embedding-3-small"
    OPENAI_CHAT_MODEL: str = "gpt-4o-mini"

    # Pinecone Configuration
    PINECONE_API_KEY: str
    PINECONE_INDEX_NAME: str = "gear-ai-manuals"

    # Attestation Configuration
    # This private key is used to sign the AI's responses, creating a verifiable attestation.
    # In production, this should be loaded from a secure vault.
    ATTESTATION_PRIVATE_KEY: str

settings = Settings()