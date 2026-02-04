# Prototypes

This directory contains working prototypes and proof-of-concepts.

## Purpose

Use this space for:
- More developed proof-of-concepts
- Feature demonstrations
- Architecture explorations
- Integration pattern testing
- MVP (Minimum Viable Product) versions

## Difference from Experiments

Prototypes are more mature than experiments:
- **Experiments**: Quick tests, may not be fully functional
- **Prototypes**: Working implementations with basic functionality
- **Apps**: Production-ready or near-production applications

## Structure

Each prototype should have:
- Clear README explaining the concept
- Working code demonstrating the feature
- Basic documentation
- Simple test cases (if applicable)

## Best Practices

1. **Make it Work**: Prototypes should be functional
2. **Document Thoroughly**: Explain what problem you're solving
3. **Keep it Focused**: Each prototype should demonstrate one concept
4. **Graduate to Apps**: Move production-worthy prototypes to `/apps`

## Example Structure

```
prototypes/
├── real-time-chat/
│   ├── README.md
│   ├── server/
│   └── client/
├── ml-recommendation-engine/
│   ├── README.md
│   ├── model/
│   └── api/
└── blockchain-wallet/
    ├── README.md
    └── src/
```

## Lifecycle

1. Start as an experiment in `/experiments`
2. Develop into a prototype in `/prototypes`
3. Polish and move to `/apps` for production use
