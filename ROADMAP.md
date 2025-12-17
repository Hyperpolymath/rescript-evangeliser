# Roadmap

**ReScript Evangeliser** - VS Code Extension for Learning ReScript

*Last Updated: 2025-12-17*

---

## Current Status

| Metric | Value |
|--------|-------|
| Version | 0.1.0 |
| Phase | Initial Setup |
| Overall Completion | 25% |
| RSR Compliance | Bronze (Partial) |
| Critical Blockers | 1 (TypeScript conversion) |

---

## Phase 1: Foundation (Current) - 25% Complete

### Completed

- [x] RSR Bronze-level compliance (documentation, licenses, .well-known/)
- [x] SCM files (guix.scm, ECOSYSTEM.scm, META.scm, STATE.scm)
- [x] CI/CD pipelines (GitHub Actions + GitLab CI)
- [x] Security policy (10-dimensional model, RFC 9116 security.txt)
- [x] Nix flake for reproducible builds
- [x] justfile with 70+ automation recipes
- [x] Comprehensive documentation suite
- [x] TypeScript extension scaffold (4,130 lines across 9 files)
- [x] 50+ transformation patterns defined
- [x] Four-layer UI architecture (RAW/FOLDED/GLYPHED/WYSIWYG)
- [x] Makaton-inspired glyph system (21 symbols)

### In Progress

- [ ] Security hardening (security.txt updated 2025-12-17)

### Blocked

- [ ] TypeScript -> ReScript conversion (REQUIRED by RSR policy)

---

## Phase 2: ReScript Migration - 0% Complete

**Priority: CRITICAL** - CI blocks new TS/JS files

### TypeScript Files Requiring Conversion

| File | Lines | Priority | Complexity |
|------|-------|----------|------------|
| `extension/src/types.ts` | 229 | Critical | Low |
| `extension/src/extension.ts` | ~800 | Critical | High |
| `extension/src/narrative.ts` | ~300 | High | Medium |
| `extension/src/glyphs.ts` | ~200 | High | Low |
| `extension/src/patterns/pattern-library.ts` | ~1000 | High | High |
| `extension/src/patterns/advanced-patterns.ts` | ~800 | Medium | High |
| `extension/src/webview/transformation-panel.ts` | ~500 | Medium | Medium |
| `extension/src/test/narrative.test.ts` | ~150 | Low | Low |
| `extension/src/test/pattern-library.test.ts` | ~150 | Low | Low |

**Total: ~4,130 lines**

### Migration Steps

1. **Set up ReScript tooling**
   - [ ] Install ReScript compiler
   - [ ] Create bsconfig.json / rescript.json
   - [ ] Configure VS Code extension bindings
   - [ ] Set up ReScript-to-JS generation for VS Code compatibility

2. **Convert type definitions first**
   - [ ] Convert `types.ts` -> `Types.res` / `Types.resi`
   - [ ] Define all interfaces as ReScript records/variants

3. **Convert core modules**
   - [ ] `extension.ts` -> `Extension.res`
   - [ ] `narrative.ts` -> `Narrative.res`
   - [ ] `glyphs.ts` -> `Glyphs.res`

4. **Convert pattern detection**
   - [ ] `pattern-library.ts` -> `PatternLibrary.res`
   - [ ] `advanced-patterns.ts` -> `AdvancedPatterns.res`

5. **Convert UI layer**
   - [ ] `transformation-panel.ts` -> `TransformationPanel.res`
   - [ ] Create VS Code API bindings

6. **Convert tests**
   - [ ] Set up rescript-test or Jest bindings
   - [ ] Convert test files

7. **Remove TypeScript**
   - [ ] Delete original .ts files
   - [ ] Remove tsconfig.json
   - [ ] Update CI/CD workflows

---

## Phase 3: RSR Gold Compliance - 0% Complete

### Requirements

- [ ] Add Containerfile (Docker/Podman)
- [ ] Complete TypeScript -> ReScript migration
- [ ] Achieve 70%+ test coverage
- [ ] Add SBOM (Software Bill of Materials)
- [ ] Pin all GitHub Actions to SHA

### Optional Enhancements

- [ ] Add Deno support (per RSR policy preference)
- [ ] Remove npm in favor of Deno
- [ ] Add OpenSSF Scorecard badge

---

## Phase 4: Feature Completion - 0% Complete

### Core Features

- [ ] All 50+ patterns fully functional
- [ ] RAW view complete
- [ ] FOLDED view complete
- [ ] GLYPHED view complete
- [ ] WYSIWYG view complete

### Learning System

- [ ] Tutorial system
- [ ] Learning path tracker
- [ ] Achievement system
- [ ] Progress persistence

### Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| Pattern detection | <300ms | ~75ms |
| Memory usage | <100MB | ~20MB |
| UI response | <50ms | ~15ms |

---

## Phase 5: v1.0.0 Release

**Target: Q2 2025**

### Release Criteria

- [ ] All patterns functional (50+)
- [ ] All four UI layers complete
- [ ] 90%+ test coverage
- [ ] RSR Gold compliance
- [ ] Performance targets met
- [ ] Documentation complete
- [ ] VS Code Marketplace ready
- [ ] Security audit passed

---

## Version Milestones

| Version | Target | Key Deliverables |
|---------|--------|------------------|
| 0.1.0 | Done | Initial scaffold, TypeScript prototype |
| 0.2.0 | Q1 2025 | ReScript migration complete |
| 0.3.0 | Q1 2025 | RAW + GLYPHED views functional |
| 0.4.0 | Q2 2025 | FOLDED + WYSIWYG views functional |
| 0.5.0 | Q2 2025 | Learning system complete |
| 1.0.0 | Q2 2025 | Stable release |

---

## Technical Debt

### High Priority

1. **TypeScript codebase** - Must convert to ReScript
2. **npm dependency** - RSR prefers Deno
3. **Missing Containerfile** - Required for RSR Gold

### Medium Priority

1. **Test coverage** - Currently unknown, target 70%+
2. **Missing SBOM** - Add for supply chain transparency
3. **GitHub Actions** - Pin to SHA for security

### Low Priority

1. **GenType integration** - For TypeScript consumers
2. **Bundle optimization** - Reduce extension size
3. **Telemetry opt-in** - Privacy-preserving analytics

---

## Security Roadmap

### Completed

- [x] 10-dimensional security model
- [x] RFC 9116 security.txt (updated 2025-12-17)
- [x] Content Security Policy
- [x] Resource limits (10MB, 5s, 100MB)
- [x] Offline-first architecture
- [x] CodeQL SAST in CI

### Planned

- [ ] SLSA Level 2 provenance
- [ ] Signed releases (Sigstore)
- [ ] Security advisory process
- [ ] Annual security review

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to help with:

- ReScript migration (highest priority)
- Pattern development
- UI/UX improvements
- Documentation
- Testing

---

## References

- [STATE.scm](STATE.scm) - Machine-readable project state
- [META.scm](META.scm) - Architecture decisions
- [ECOSYSTEM.scm](ECOSYSTEM.scm) - Ecosystem positioning
- [RSR_COMPLIANCE.adoc](RSR_COMPLIANCE.adoc) - RSR compliance status
- [SECURITY.md](SECURITY.md) - Security policy
- [CHANGELOG.md](CHANGELOG.md) - Version history
