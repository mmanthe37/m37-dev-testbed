# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial repository structure with organized directories
  - `/experiments` - For quick technology explorations
  - `/prototypes` - For working proof-of-concepts
  - `/apps` - For full applications under development
  - `/research` - For research notes and documentation
  - `/scripts` - For utility scripts and tools
  - `/docs` - For project documentation
  - `/templates` - For project starter templates
- Comprehensive README.md explaining repository purpose as a personal dev lab
- Template files for common project types:
  - React/Next.js template with TypeScript and Tailwind CSS
  - Swift/SwiftUI template with MVVM architecture
  - Python script template with best practices
- Multi-language .gitignore covering:
  - Node.js/JavaScript/TypeScript
  - Python
  - Swift/iOS/macOS
  - Go, Rust, Java, Ruby, C/C++
  - Database files
  - Secrets and credentials
  - Build artifacts and dependencies
- GitHub Actions workflow for linting
- CHANGELOG.md for tracking repository changes

### Changed
- N/A

### Deprecated
- N/A

### Removed
- N/A

### Fixed
- N/A

### Security
- Enhanced .gitignore to exclude sensitive files (API keys, certificates, credentials)

## [1.0.0] - 2026-02-04

### Added
- Initial commit with base repository structure
- Basic project files for various technology stacks

---

## How to Update This Changelog

When making changes to the repository:

1. Add entries under `[Unreleased]` section
2. Group changes by type: Added, Changed, Deprecated, Removed, Fixed, Security
3. Keep descriptions clear and concise
4. When creating a release, move unreleased changes to a new version section
5. Follow [Semantic Versioning](https://semver.org/):
   - MAJOR version for incompatible API changes
   - MINOR version for new functionality in a backwards compatible manner
   - PATCH version for backwards compatible bug fixes

### Example Entry Format
```markdown
### Added
- New feature description [#issue-number]

### Fixed
- Bug fix description [#issue-number]
```
