# Project Templates

This directory contains starter templates and boilerplates for common project types.

## Available Templates

### 1. React/Next.js Template (`react-nextjs/`)
A modern React application with Next.js App Router, TypeScript, and Tailwind CSS.

**Features:**
- Next.js 14+ with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- ESLint and Prettier
- Ready for deployment

**Use when:**
- Building modern web applications
- Need server-side rendering
- Want React with TypeScript
- Building full-stack applications

### 2. Swift/SwiftUI Template (`swift-swiftui/`)
An iOS/macOS application template with SwiftUI and MVVM architecture.

**Features:**
- SwiftUI for declarative UI
- MVVM architecture pattern
- iOS 16+ support
- Async/await patterns
- Sample views and models

**Use when:**
- Building iOS or macOS apps
- Using modern SwiftUI
- Need clean architecture
- Starting a native Apple project

### 3. Python Script Template (`python-script/`)
A well-structured Python script with best practices.

**Features:**
- CLI argument parsing
- Logging configuration
- Type hints
- Testing infrastructure
- Environment variables
- Virtual environment setup

**Use when:**
- Creating automation scripts
- Building CLI tools
- Processing data
- Quick Python utilities

## Using Templates

### Quick Start

1. **Copy the template** to your target directory:
   ```bash
   cp -r templates/react-nextjs experiments/my-new-project
   cd experiments/my-new-project
   ```

2. **Install dependencies** (varies by template):
   ```bash
   # For React/Next.js
   npm install
   
   # For Python
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   pip install -r requirements.txt
   ```

3. **Customize** the template:
   - Update `package.json` or configuration files
   - Rename files and folders as needed
   - Modify code to fit your project

4. **Start developing**:
   ```bash
   # React/Next.js
   npm run dev
   
   # Python
   python main.py
   ```

### Template Structure

Each template includes:
- **README.md**: Detailed setup and usage instructions
- **Configuration files**: Project-specific configs
- **Example code**: Working examples to build upon
- **Dependencies**: Required packages/libraries
- **Best practices**: Code organization and patterns

## Creating New Templates

Want to add a new template? Follow these guidelines:

1. **Create directory** in `/templates`
2. **Add comprehensive README.md**
3. **Include working example code**
4. **Add configuration files**
5. **Document dependencies**
6. **Test the template** in a fresh environment

### Template Checklist
- [ ] Clear README with setup instructions
- [ ] Working example code
- [ ] Configuration files
- [ ] Dependency management (package.json, requirements.txt, etc.)
- [ ] .gitignore or similar
- [ ] Comments explaining key parts
- [ ] Example .env file (if needed)
- [ ] License information (if applicable)

## Template Best Practices

1. **Keep it Simple**: Templates should be easy to understand
2. **Document Well**: Explain every step clearly
3. **Include Examples**: Show how to use the template
4. **Stay Updated**: Keep dependencies current
5. **Be Flexible**: Make it easy to customize
6. **Follow Standards**: Use industry best practices

## Common Customizations

### For All Templates:
- Update project name
- Change author information
- Modify descriptions
- Update license

### React/Next.js:
- Configure Tailwind theme
- Add custom components
- Set up environment variables
- Configure deployment settings

### Swift/SwiftUI:
- Update bundle identifier
- Configure app icons
- Add custom colors
- Set up navigation

### Python:
- Modify CLI arguments
- Add custom utilities
- Configure logging
- Set up data paths

## Tips

- **Version Control**: Initialize git in your new project
- **Environment Setup**: Follow the template's setup instructions carefully
- **Dependencies**: Keep dependencies up to date
- **Customization**: Don't be afraid to modify templates to fit your needs
- **Learning**: Study the template code to understand patterns

## Contributing Templates

Have a great template idea? Consider adding it:

1. Create the template following the structure above
2. Test it thoroughly
3. Document it completely
4. Submit it for review

## Resources

### React/Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)

### Swift/SwiftUI
- [SwiftUI Tutorials](https://developer.apple.com/tutorials/swiftui)
- [Swift Documentation](https://swift.org/documentation)

### Python
- [Python Documentation](https://docs.python.org)
- [PEP 8 Style Guide](https://pep8.org)
- [Real Python](https://realpython.com)

---

**Happy building with templates! 🚀**
