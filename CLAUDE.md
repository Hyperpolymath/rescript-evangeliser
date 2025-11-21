# CLAUDE.md

## Project Overview

**ReScript Evangeliser** is a project dedicated to promoting and advocating for the ReScript programming language. ReScript is a robustly typed language that compiles to efficient and human-readable JavaScript.

## Project Purpose

This repository serves as a resource hub for:
- Educational materials about ReScript
- Example projects and code snippets
- Tools and utilities to help developers adopt ReScript
- Community content to evangelize ReScript's benefits

## Technology Stack

### Core Technologies
- **ReScript**: A soundly typed language that leverages JavaScript's ecosystem
- **Node.js**: Runtime environment for tooling and build processes
- **npm/yarn**: Package management

### Key ReScript Features to Understand
- **Type Safety**: 100% sound type system with excellent inference
- **Fast Compilation**: Compiles to readable JavaScript in milliseconds
- **JavaScript Interop**: Seamless integration with existing JavaScript code
- **Functional Programming**: First-class support for functional patterns
- **Pattern Matching**: Powerful pattern matching with exhaustiveness checking

## Project Structure

```
rescript-evangeliser/
├── src/              # ReScript source files (.res, .resi)
├── lib/              # Compiled JavaScript output
├── examples/         # Example code and demos
├── docs/             # Documentation and guides
├── tools/            # Utility scripts and tools
└── bsconfig.json     # ReScript build configuration
```

## Development Guidelines

### Code Style
- Follow ReScript's official style guide
- Use meaningful variable and function names
- Prefer pattern matching over if/else when appropriate
- Leverage the type system to make invalid states unrepresentable
- Write interface files (.resi) for public APIs

### Best Practices
1. **Type-First Design**: Design types before implementation
2. **Immutability**: Prefer immutable data structures
3. **Pure Functions**: Write pure functions when possible
4. **Documentation**: Document complex type definitions and public APIs
5. **Error Handling**: Use Result and Option types instead of exceptions

### ReScript-Specific Patterns
- Use `@react.component` for React components
- Leverage pipe operator (`->`) for data transformations
- Use labeled arguments for better API clarity
- Prefer records over tuples for structured data
- Use variants for state machines and tagged unions

## Common Commands

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Watch mode for development
npm run dev

# Clean build artifacts
npm run clean

# Run tests
npm test

# Format code
npm run format
```

## Working with ReScript

### Module System
- Each .res file is automatically a module
- Modules are capitalized (filename.res becomes Filename module)
- Use .resi files to define module interfaces
- Modules can be nested using module bindings

### JavaScript Interop
- Use `@module` for importing JS modules
- Use `@val` for accessing global values
- Use `@send` for calling JS methods
- Raw JS can be embedded with `%%raw()`

### Type Definitions
- External JavaScript libraries need ReScript bindings
- Create bindings in separate files (e.g., `ExternalLib.res`)
- Consider contributing bindings to @rescript community packages

## Testing

- Use `rescript-test` or integrate with Jest
- Write tests alongside source files or in `__tests__` directories
- Test edge cases and type safety boundaries
- Include integration tests for JS interop

## Documentation

### For Contributors
- Document WHY not just WHAT in code comments
- Update documentation when changing public APIs
- Include examples in documentation
- Keep CLAUDE.md updated with architectural decisions

### For Users
- Provide clear getting started guides
- Include real-world examples
- Document common pitfalls and solutions
- Show migration paths from JavaScript/TypeScript

## Build System

ReScript uses its own build system (bsb/rescript):
- Fast incremental compilation
- Configured via `bsconfig.json`
- Supports custom generators and middleware
- Can output CommonJS, ES6 modules, or both

## Key Configuration Files

### bsconfig.json
```json
{
  "name": "rescript-evangeliser",
  "sources": ["src"],
  "package-specs": {
    "module": "es6",
    "in-source": true
  },
  "suffix": ".js",
  "bs-dependencies": []
}
```

## Dependencies

### Development Dependencies
- `rescript`: The ReScript compiler
- `@rescript/core`: Standard library
- Additional packages as needed for specific functionality

### Peer Dependencies
- Node.js (LTS version recommended)
- npm or yarn

## Integration Patterns

### With React
```rescript
@react.component
let make = (~name) => {
  <div> {React.string("Hello " ++ name)} </div>
}
```

### With Node.js
```rescript
@module("fs") external readFileSync: string => string = "readFileSync"
```

### With TypeScript Projects
- ReScript can generate .d.ts files
- Use GenType for automatic TypeScript binding generation

## Evangelism Goals

1. **Demonstrate Value**: Show concrete benefits of ReScript
2. **Lower Barriers**: Make adoption as easy as possible
3. **Share Success Stories**: Document real-world wins
4. **Build Community**: Foster a welcoming environment
5. **Create Resources**: Provide learning materials and tools

## Resources

### Official Documentation
- [ReScript Documentation](https://rescript-lang.org/docs)
- [ReScript Forum](https://forum.rescript-lang.org)
- [ReScript GitHub](https://github.com/rescript-lang)

### Community
- ReScript Discord
- Twitter: @rescriptlang
- ReScript Blog

## Contributing

When contributing to this project:
1. Ensure code compiles without warnings
2. Add tests for new functionality
3. Update documentation as needed
4. Follow the established code style
5. Write clear commit messages

## Troubleshooting

### Common Issues
- **Build errors**: Check `bsconfig.json` for configuration issues
- **Type errors**: ReScript's error messages are usually helpful; read carefully
- **JS interop**: Verify external bindings match JavaScript API
- **Module not found**: Check file paths and module names (case-sensitive)

### Getting Help
- Check ReScript documentation first
- Search the forum for similar issues
- Ask in the ReScript Discord
- File issues on GitHub for bugs

## Notes for Claude

When working on this project:
- Prioritize type safety and correctness
- Suggest idiomatic ReScript patterns
- Consider JavaScript interop implications
- Help maintain clear documentation
- Encourage best practices in evangelism materials
- Focus on making ReScript accessible to newcomers
- Highlight ReScript's unique advantages over TypeScript/JavaScript

## Project Philosophy

**Make ReScript Approachable**: The goal is to help developers discover and adopt ReScript by:
- Showing practical examples
- Addressing common concerns
- Demonstrating real benefits
- Providing migration paths
- Building confidence through education

---

*This document should be updated as the project evolves and new patterns emerge.*
