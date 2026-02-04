# Python Script Template

A well-structured Python script template with best practices.

## Features

- 🐍 **Python 3.8+** - Modern Python features
- 📝 **Logging** - Built-in logging configuration
- ⚙️ **CLI Arguments** - Command-line argument parsing
- 🧪 **Testing Ready** - Unit test structure included
- 📊 **Type Hints** - Type annotations for better code quality
- 🔧 **Configuration** - Environment variable support
- 📦 **Virtual Environment** - Isolated dependencies

## Getting Started

### Prerequisites

- Python 3.8 or later
- pip (Python package installer)

### Installation

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Usage

```bash
# Run the script
python main.py

# Run with arguments
python main.py --input data.txt --output result.txt

# Show help
python main.py --help

# Run with verbose logging
python main.py --verbose
```

## Project Structure

```
python-script/
├── main.py              # Main script entry point
├── config.py            # Configuration settings
├── utils.py             # Utility functions
├── requirements.txt     # Python dependencies
├── requirements-dev.txt # Development dependencies
├── tests/
│   └── test_main.py    # Unit tests
├── .env.example        # Environment variables example
└── README.md           # This file
```

## Configuration

1. Copy `.env.example` to `.env`
2. Update environment variables as needed
3. Configuration is loaded from `config.py`

## Development

### Code Style

This template follows PEP 8 style guide:

```bash
# Format code with Black
black .

# Check style with flake8
flake8 .

# Type checking with mypy
mypy .
```

### Testing

```bash
# Run tests
python -m pytest

# Run tests with coverage
python -m pytest --cov=.

# Run specific test
python -m pytest tests/test_main.py::test_function_name
```

## Script Features

### Logging

```python
import logging

logger = logging.getLogger(__name__)
logger.info("Information message")
logger.warning("Warning message")
logger.error("Error message")
```

### CLI Arguments

```python
import argparse

parser = argparse.ArgumentParser(description='Script description')
parser.add_argument('--input', help='Input file path')
args = parser.parse_args()
```

### Environment Variables

```python
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv('API_KEY')
```

## Best Practices

1. **Use Type Hints**: Add type annotations to functions
2. **Handle Errors**: Use try-except blocks appropriately
3. **Log Events**: Use logging instead of print statements
4. **Write Tests**: Test your functions with unit tests
5. **Document Code**: Use docstrings for functions and classes
6. **Use Virtual Environments**: Isolate project dependencies
7. **Follow PEP 8**: Maintain consistent code style

## Common Use Cases

### File Processing
```python
def process_file(input_path: str, output_path: str) -> None:
    """Process a file and write results."""
    with open(input_path, 'r') as f:
        data = f.read()
    
    # Process data
    result = data.upper()
    
    with open(output_path, 'w') as f:
        f.write(result)
```

### API Calls
```python
import requests

def fetch_data(url: str) -> dict:
    """Fetch data from API."""
    response = requests.get(url)
    response.raise_for_status()
    return response.json()
```

### Data Processing
```python
import pandas as pd

def analyze_data(file_path: str) -> pd.DataFrame:
    """Analyze data from CSV file."""
    df = pd.read_csv(file_path)
    return df.describe()
```

## Dependencies

Core dependencies (see `requirements.txt`):
- `requests` - HTTP library
- `python-dotenv` - Environment variable management

Development dependencies (see `requirements-dev.txt`):
- `pytest` - Testing framework
- `black` - Code formatter
- `flake8` - Linter
- `mypy` - Type checker

## Troubleshooting

**Virtual environment not activating?**
- Make sure you're using the correct activation command for your OS
- Try recreating the virtual environment

**Module not found errors?**
- Ensure virtual environment is activated
- Run `pip install -r requirements.txt`

**Import errors?**
- Check that all dependencies are installed
- Verify Python version compatibility

## Resources

- [Python Documentation](https://docs.python.org/3/)
- [PEP 8 Style Guide](https://pep8.org/)
- [pytest Documentation](https://docs.pytest.org/)
- [Real Python Tutorials](https://realpython.com/)

---

**Happy Python coding! 🐍**
