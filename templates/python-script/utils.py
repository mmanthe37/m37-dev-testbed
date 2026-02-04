"""
Utility functions for the script.

Common helper functions and utilities.
"""

import logging
import sys
from pathlib import Path
from typing import Any, Optional


def setup_logging(level: int = logging.INFO) -> None:
    """
    Configure logging for the application.
    
    Args:
        level: Logging level (e.g., logging.INFO, logging.DEBUG)
    """
    logging.basicConfig(
        level=level,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S',
        handlers=[
            logging.StreamHandler(sys.stdout),
            logging.FileHandler('app.log')
        ]
    )


def validate_file(file_path: str) -> bool:
    """
    Validate that a file exists.
    
    Args:
        file_path: Path to the file
        
    Returns:
        True if file exists, False otherwise
    """
    return Path(file_path).is_file()


def validate_directory(dir_path: str) -> bool:
    """
    Validate that a directory exists.
    
    Args:
        dir_path: Path to the directory
        
    Returns:
        True if directory exists, False otherwise
    """
    return Path(dir_path).is_dir()


def safe_read_file(file_path: str, encoding: str = 'utf-8') -> Optional[str]:
    """
    Safely read a file and handle errors.
    
    Args:
        file_path: Path to the file
        encoding: File encoding (default: utf-8)
        
    Returns:
        File contents or None if error occurs
    """
    try:
        with open(file_path, 'r', encoding=encoding) as f:
            return f.read()
    except Exception as e:
        logging.error(f"Error reading file {file_path}: {e}")
        return None


def safe_write_file(file_path: str, content: str, encoding: str = 'utf-8') -> bool:
    """
    Safely write to a file and handle errors.
    
    Args:
        file_path: Path to the file
        content: Content to write
        encoding: File encoding (default: utf-8)
        
    Returns:
        True if successful, False otherwise
    """
    try:
        with open(file_path, 'w', encoding=encoding) as f:
            f.write(content)
        return True
    except Exception as e:
        logging.error(f"Error writing file {file_path}: {e}")
        return False


def format_size(bytes: int) -> str:
    """
    Format byte size to human-readable format.
    
    Args:
        bytes: Size in bytes
        
    Returns:
        Formatted size string (e.g., "1.5 MB")
    """
    for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
        if bytes < 1024.0:
            return f"{bytes:.1f} {unit}"
        bytes /= 1024.0
    return f"{bytes:.1f} PB"
