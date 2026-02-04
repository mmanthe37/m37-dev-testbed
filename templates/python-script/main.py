#!/usr/bin/env python3
"""
Main script template with best practices.

This script demonstrates a well-structured Python application with:
- Logging
- CLI argument parsing
- Error handling
- Type hints
- Documentation
"""

import argparse
import logging
import sys
from typing import Optional
from pathlib import Path

from config import Config
from utils import setup_logging, validate_file


# Configure logging
logger = logging.getLogger(__name__)


def main(args: argparse.Namespace) -> int:
    """
    Main entry point for the script.
    
    Args:
        args: Parsed command-line arguments
        
    Returns:
        Exit code (0 for success, non-zero for errors)
    """
    try:
        logger.info("Starting script execution")
        
        # Validate inputs
        if args.input:
            if not validate_file(args.input):
                logger.error(f"Input file not found: {args.input}")
                return 1
        
        # Your main logic here
        logger.info("Processing data...")
        
        result = process_data(args.input, args.output)
        
        logger.info(f"Script completed successfully. Result: {result}")
        return 0
        
    except Exception as e:
        logger.error(f"An error occurred: {e}", exc_info=True)
        return 1


def process_data(input_path: Optional[str], output_path: Optional[str]) -> str:
    """
    Process data from input file and write to output file.
    
    Args:
        input_path: Path to input file (optional)
        output_path: Path to output file (optional)
        
    Returns:
        Status message
    """
    if input_path:
        logger.info(f"Reading from: {input_path}")
        with open(input_path, 'r') as f:
            data = f.read()
            logger.debug(f"Read {len(data)} characters")
    else:
        data = "Sample data"
        logger.info("Using sample data")
    
    # Process the data (example: convert to uppercase)
    processed_data = data.upper()
    
    if output_path:
        logger.info(f"Writing to: {output_path}")
        with open(output_path, 'w') as f:
            f.write(processed_data)
        return f"Data written to {output_path}"
    else:
        print(processed_data)
        return "Data printed to console"


def parse_arguments() -> argparse.Namespace:
    """
    Parse command-line arguments.
    
    Returns:
        Parsed arguments
    """
    parser = argparse.ArgumentParser(
        description='Python script template with best practices',
        formatter_class=argparse.ArgumentDefaultsHelpFormatter
    )
    
    parser.add_argument(
        '-i', '--input',
        type=str,
        help='Input file path'
    )
    
    parser.add_argument(
        '-o', '--output',
        type=str,
        help='Output file path'
    )
    
    parser.add_argument(
        '-v', '--verbose',
        action='store_true',
        help='Enable verbose logging'
    )
    
    parser.add_argument(
        '--version',
        action='version',
        version='%(prog)s 1.0.0'
    )
    
    return parser.parse_args()


if __name__ == '__main__':
    # Parse arguments
    args = parse_arguments()
    
    # Setup logging
    log_level = logging.DEBUG if args.verbose else logging.INFO
    setup_logging(log_level)
    
    # Run main function and exit with status code
    sys.exit(main(args))
