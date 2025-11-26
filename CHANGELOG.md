# Changelog

All notable changes to the ReScript Evangeliser project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project structure
- Core TypeScript modules (extension.ts, types.ts, glyphs.ts, narrative.ts)
- 50+ JavaScript → ReScript transformation patterns
- Four-layer UI architecture (RAW, FOLDED, GLYPHED, WYSIWYG)
- Makaton-inspired glyph system (21 visual symbols)
- Encouraging narrative generation system
- AST-based pattern matching using Babel parser
- Comprehensive test suite with 100% coverage target
- RSR Bronze-level compliance
- Dual licensing (MIT + Palimpsest v0.8)
- TPCF Perimeter 3 governance framework
- Offline-first architecture (zero network dependencies)
- Complete documentation (README, CONTRIBUTING, SECURITY, etc.)
- .well-known/ directory (security.txt, ai.txt, humans.txt)
- Build system (justfile, CI/CD, Nix flake)
- VS Code extension commands and keybindings
- Pattern library browser
- Learning path tracker
- Performance monitoring (<300ms detection, <100MB memory)
- Privacy-preserving optional telemetry
- Workspace trust integration
- Example JavaScript files for testing
- Tutorial system foundation
- ReScript example projects (Project 1: Stack)

### Changed
- N/A (initial release)

### Deprecated
- N/A (initial release)

### Removed
- N/A (initial release)

### Fixed
- N/A (initial release)

### Security
- Implemented input validation for all user code
- Content Security Policy for webviews
- Resource limits (file size, parsing timeout, memory)
- No network dependencies (offline-first security model)
- Supply chain security (minimal dependencies, lockfile)
- RFC 9116 compliant security.txt

## [0.1.0] - 2024-11-22

### Added
- Initial alpha release
- Core extension functionality
- 10 foundational patterns (Phase 1 complete):
  1. Null safety checks → Option types
  2. Async/await → Promise types
  3. Try/catch → Result types
  4. Array.map/filter/reduce → Pipe operator
  5. Ternary conditionals → Pattern matching
  6. Object destructuring → Record patterns
  7. Default parameters → Option.getOr
  8. Array.reduce → Recursive patterns
  9. Template literals → String interpolation
  10. Arrow functions → ReScript functions
- RAW view (side-by-side comparison with narratives)
- GLYPHED view (symbol-annotated code)
- Basic UI shells for FOLDED and WYSIWYG views
- 11 core glyphs (🔄🎯🛡️➡️🌿📦🔗💎⏳✅💡)
- Pattern detection via regex (Phase 1) and AST (Phase 2)
- VS Code extension scaffolding
- TypeScript strict mode configuration
- ESLint and testing infrastructure
- Initial documentation

### Performance
- Pattern detection: 50-100ms (target: <300ms) ✅
- Memory usage: ~20MB (target: <100MB) ✅
- UI response: 10-20ms (target: <50ms) ✅

### Documentation
- README with quick start guide
- CLAUDE.md with project context
- Pattern library documentation
- Quick start guide
- Project overview
- Status tracking document

## Version History

### Version Numbering

We use **Semantic Versioning** (SemVer):

- **MAJOR** (0.x.x): Breaking changes to public API or extension behavior
- **MINOR** (x.1.x): New features, backwards-compatible
- **PATCH** (x.x.1): Bug fixes, backwards-compatible

### Pre-1.0 Status

This project is currently **pre-1.0** (alpha/beta):

- **0.x.x**: API and behavior may change between minor versions
- **1.0.0**: First stable release, API stability guaranteed
- **Target**: Q2 2025 for 1.0.0 release

### Release Cycle

- **Major releases**: Every 6-12 months (post-1.0)
- **Minor releases**: Every 1-2 months
- **Patch releases**: As needed for critical bugs
- **Security releases**: Immediate (out-of-band)

## Migration Guides

### Upgrading to 0.1.0

This is the initial release, no migration needed!

### Future Upgrades

Migration guides will be provided for breaking changes:

- **0.1.x → 0.2.x**: [Coming soon]
- **0.x.x → 1.0.0**: [Coming soon]

## Deprecated Features

### Currently Deprecated

*None yet - this is a new project!*

### Deprecation Policy

- **Notice Period**: 3 months minimum before removal
- **Migration Path**: Always provided for deprecated features
- **Documentation**: Clearly marked in docs and code
- **Warnings**: Runtime warnings in VS Code (if applicable)

## Breaking Changes

### 0.x.x Series

Breaking changes may occur in minor versions during pre-1.0 development. We will:

- Clearly document all breaking changes
- Provide migration instructions
- Offer support in GitHub Discussions

### Post-1.0

Breaking changes will only occur in major version bumps.

## Security Updates

Security updates are released **immediately** and out-of-band from regular releases.

See [SECURITY.md](SECURITY.md) for:
- Security update timeline
- Vulnerability reporting process
- Supported versions

## Contributing to Changelog

When contributing, please update this file:

1. Add your changes under `[Unreleased]`
2. Choose appropriate section (Added, Changed, Fixed, etc.)
3. Write clear, user-focused descriptions
4. Link to relevant issues/PRs when applicable

Example:
```markdown
### Added
- New pattern for object spread operator ([#123](https://github.com/...))
- Support for TypeScript decorators ([#456](https://github.com/...))
```

## Changelog Standards

We follow these standards:

- **User-focused**: Describe impact on users, not implementation
- **Concise**: One line per change when possible
- **Links**: Include links to issues/PRs for details
- **Grouped**: Group related changes together
- **Emoji-free**: Keep changelog text-only (readability)
- **Date format**: ISO 8601 (YYYY-MM-DD)

## Acknowledgments

Thank you to all contributors who help make each release possible!

See [humans.txt](.well-known/humans.txt) for contributor recognition.

---

**How to stay updated:**

- Watch this repository for releases
- Subscribe to GitHub notifications
- Follow announcements in GitHub Discussions
- Check the [Releases page](https://github.com/Hyperpolymath/rescript-evangeliser/releases)

---

**Questions about a release?**

Ask in [GitHub Discussions](https://github.com/Hyperpolymath/rescript-evangeliser/discussions) or open an issue.

[Unreleased]: https://github.com/Hyperpolymath/rescript-evangeliser/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/Hyperpolymath/rescript-evangeliser/releases/tag/v0.1.0
