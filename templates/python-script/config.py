"""
Configuration module for the script.

Load configuration from environment variables and provide defaults.
"""

import os
from typing import Optional
from pathlib import Path
from dotenv import load_dotenv


# Load environment variables from .env file
load_dotenv()


class Config:
    """Application configuration."""
    
    # General settings
    APP_NAME: str = "PythonScript"
    VERSION: str = "1.0.0"
    
    # Paths
    BASE_DIR: Path = Path(__file__).parent
    DATA_DIR: Path = BASE_DIR / "data"
    OUTPUT_DIR: Path = BASE_DIR / "output"
    
    # Environment-specific settings
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
    
    # API settings (example)
    API_KEY: Optional[str] = os.getenv("API_KEY")
    API_URL: str = os.getenv("API_URL", "https://api.example.com")
    
    # Processing settings
    BATCH_SIZE: int = int(os.getenv("BATCH_SIZE", "100"))
    MAX_RETRIES: int = int(os.getenv("MAX_RETRIES", "3"))
    
    @classmethod
    def ensure_directories(cls) -> None:
        """Create necessary directories if they don't exist."""
        cls.DATA_DIR.mkdir(parents=True, exist_ok=True)
        cls.OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


# Create directories on import
Config.ensure_directories()
