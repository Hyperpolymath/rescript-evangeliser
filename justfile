# justfile for ReScript Evangeliser
# https://github.com/casey/just

# List all available recipes
default:
    @just --list

# Install dependencies
install:
    cd extension && npm install

# Compile TypeScript
compile:
    cd extension && npm run compile

# Run in watch mode for development
watch:
    cd extension && npm run watch

# Run all tests
test:
    cd extension && npm test

# Run tests with coverage
test-coverage:
    cd extension && npm run test:coverage

# Run tests in watch mode
test-watch:
    cd extension && npm run test:watch

# Run linter
lint:
    cd extension && npm run lint

# Fix linting issues
lint-fix:
    cd extension && npm run lint -- --fix

# Run security audit
audit:
    cd extension && npm audit

# Fix security vulnerabilities
audit-fix:
    cd extension && npm audit fix

# Clean build artifacts
clean:
    rm -rf extension/out extension/dist
    rm -rf extension/node_modules/.cache

# Deep clean (including node_modules)
clean-all:
    rm -rf extension/out extension/dist extension/node_modules
    rm -f extension/package-lock.json

# Rebuild from scratch
rebuild: clean-all install compile test

# Validate RSR compliance
validate:
    @echo "🔍 Validating RSR Bronze-level compliance..."
    @just validate-structure
    @just validate-docs
    @just validate-security
    @just validate-licenses
    @just validate-build
    @just validate-tests
    @echo "✅ RSR validation complete!"

# Validate project structure
validate-structure:
    @echo "📁 Checking project structure..."
    @test -d extension/src || (echo "❌ Missing extension/src" && exit 1)
    @test -f extension/package.json || (echo "❌ Missing package.json" && exit 1)
    @test -f extension/tsconfig.json || (echo "❌ Missing tsconfig.json" && exit 1)
    @test -d .well-known || (echo "❌ Missing .well-known/" && exit 1)
    @echo "✅ Project structure valid"

# Validate documentation
validate-docs:
    @echo "📚 Checking documentation..."
    @test -f README.md || (echo "❌ Missing README.md" && exit 1)
    @test -f CONTRIBUTING.md || (echo "❌ Missing CONTRIBUTING.md" && exit 1)
    @test -f CODE_OF_CONDUCT.md || (echo "❌ Missing CODE_OF_CONDUCT.md" && exit 1)
    @test -f SECURITY.md || (echo "❌ Missing SECURITY.md" && exit 1)
    @test -f MAINTAINERS.md || (echo "❌ Missing MAINTAINERS.md" && exit 1)
    @test -f CHANGELOG.md || (echo "❌ Missing CHANGELOG.md" && exit 1)
    @test -f CLAUDE.md || (echo "❌ Missing CLAUDE.md" && exit 1)
    @echo "✅ Documentation complete"

# Validate security files
validate-security:
    @echo "🛡️ Checking security files..."
    @test -f .well-known/security.txt || (echo "❌ Missing security.txt" && exit 1)
    @test -f .well-known/ai.txt || (echo "❌ Missing ai.txt" && exit 1)
    @test -f .well-known/humans.txt || (echo "❌ Missing humans.txt" && exit 1)
    @test -f SECURITY.md || (echo "❌ Missing SECURITY.md" && exit 1)
    @echo "✅ Security files present"

# Validate licenses
validate-licenses:
    @echo "⚖️ Checking licenses..."
    @test -f LICENSE-MIT.txt || (echo "❌ Missing LICENSE-MIT.txt" && exit 1)
    @test -f LICENSE-PALIMPSEST.txt || (echo "❌ Missing LICENSE-PALIMPSEST.txt" && exit 1)
    @echo "✅ Dual licenses present"

# Validate build system
validate-build:
    @echo "🔨 Checking build system..."
    @test -f justfile || (echo "❌ Missing justfile" && exit 1)
    @test -f .github/workflows/ci.yml || echo "⚠️  Missing GitHub Actions CI (optional)"
    @test -f .gitlab-ci.yml || echo "⚠️  Missing GitLab CI (optional)"
    @test -f flake.nix || echo "⚠️  Missing Nix flake (optional)"
    @echo "✅ Build system configured"

# Validate tests
validate-tests:
    @echo "🧪 Running tests..."
    @cd extension && npm test
    @echo "✅ All tests passing"

# Format code
format:
    cd extension && npx prettier --write "src/**/*.ts"

# Type check without emitting
type-check:
    cd extension && npx tsc --noEmit

# Package extension for distribution
package:
    cd extension && npm run package

# Publish to VS Code marketplace (requires credentials)
publish:
    cd extension && npm run deploy

# Run extension in VS Code
run:
    @echo "Opening VS Code with extension..."
    @echo "Press F5 to launch Extension Development Host"
    code extension

# Generate documentation
docs:
    @echo "📖 Generating documentation..."
    @echo "TODO: Add typedoc or similar"

# Run performance benchmarks
benchmark:
    @echo "⚡ Running performance benchmarks..."
    @echo "TODO: Add benchmark suite"

# Check for outdated dependencies
outdated:
    cd extension && npm outdated

# Update dependencies
update:
    cd extension && npm update

# Run security checks
security: audit validate-security
    @echo "🔒 Security checks complete"

# Pre-commit checks (run before committing)
pre-commit: lint type-check test
    @echo "✅ Pre-commit checks passed!"

# Pre-push checks (run before pushing)
pre-push: pre-commit validate
    @echo "✅ Pre-push checks passed!"

# CI simulation (run what CI would run)
ci: clean install compile lint type-check test validate
    @echo "✅ CI simulation complete!"

# Development setup (first-time setup)
setup: install compile
    @echo "🎉 Development environment ready!"
    @echo "Run 'just watch' to start developing"
    @echo "Run 'just run' to open VS Code"

# Show project statistics
stats:
    @echo "📊 Project Statistics"
    @echo "===================="
    @echo "TypeScript files:"
    @find extension/src -name "*.ts" | wc -l
    @echo "Lines of code:"
    @find extension/src -name "*.ts" -exec cat {} \; | wc -l
    @echo "Test files:"
    @find extension/src -name "*.test.ts" -o -name "*.spec.ts" | wc -l
    @echo "Documentation files:"
    @find docs -name "*.md" 2>/dev/null | wc -l || echo "0"

# Generate coverage report
coverage: test-coverage
    @echo "📊 Coverage report generated"
    open extension/coverage/lcov-report/index.html || echo "Open extension/coverage/lcov-report/index.html"

# Watch files and run tests on change
test-continuous:
    cd extension && npm run test:watch

# Bundle extension for production
bundle:
    @echo "📦 Bundling extension..."
    cd extension && npm run compile
    @echo "✅ Bundle complete"

# Version bump (patch)
version-patch:
    cd extension && npm version patch

# Version bump (minor)
version-minor:
    cd extension && npm version minor

# Version bump (major)
version-major:
    cd extension && npm version major

# Create release (tag and package)
release VERSION:
    @echo "🚀 Creating release {{VERSION}}"
    cd extension && npm version {{VERSION}}
    just package
    git add .
    git commit -m "Release {{VERSION}}"
    git tag -a "v{{VERSION}}" -m "Version {{VERSION}}"
    @echo "✅ Release {{VERSION}} ready"
    @echo "Run 'git push origin main --tags' to publish"

# Install Git hooks
install-hooks:
    @echo "🪝 Installing Git hooks..."
    @echo "#!/bin/sh\njust pre-commit" > .git/hooks/pre-commit
    @chmod +x .git/hooks/pre-commit
    @echo "#!/bin/sh\njust pre-push" > .git/hooks/pre-push
    @chmod +x .git/hooks/pre-push
    @echo "✅ Git hooks installed"

# Remove Git hooks
uninstall-hooks:
    @rm -f .git/hooks/pre-commit .git/hooks/pre-push
    @echo "🗑️  Git hooks removed"

# Docker build (future)
docker-build:
    @echo "🐳 Docker support coming soon..."

# Nix build (if Nix available)
nix-build:
    @command -v nix >/dev/null && nix build || echo "Nix not installed"

# Nix development shell
nix-shell:
    @command -v nix >/dev/null && nix develop || echo "Nix not installed"

# Show help for a specific recipe
help RECIPE:
    @just --show {{RECIPE}}
