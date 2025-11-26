{
  description = "ReScript Evangeliser - VS Code extension for learning ReScript";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};

        # Node.js version to use
        nodejs = pkgs.nodejs_20;

        # Build inputs for the extension
        buildInputs = with pkgs; [
          nodejs
          just      # Command runner
          git       # Version control
        ];

        # Development tools
        devInputs = with pkgs; [
          # Editors and LSPs
          vscode
          nodePackages.typescript
          nodePackages.typescript-language-server
          nodePackages.eslint
          nodePackages.prettier

          # Testing and coverage
          # (installed via npm)

          # Documentation
          # nodePackages.typedoc

          # Misc tools
          ripgrep  # Fast grep
          fd       # Fast find
          jq       # JSON processing
        ];

      in
      {
        # Development shell
        devShells.default = pkgs.mkShell {
          buildInputs = buildInputs ++ devInputs;

          shellHook = ''
            echo "🚀 ReScript Evangeliser Development Environment"
            echo "================================================"
            echo ""
            echo "Available commands:"
            echo "  just install   - Install npm dependencies"
            echo "  just compile   - Compile TypeScript"
            echo "  just test      - Run tests"
            echo "  just watch     - Watch mode for development"
            echo "  just validate  - Validate RSR compliance"
            echo "  just --list    - Show all available commands"
            echo ""
            echo "Node.js: $(node --version)"
            echo "npm: $(npm --version)"
            echo "just: $(just --version)"
            echo ""

            # Set up Node environment
            export PATH="$PWD/extension/node_modules/.bin:$PATH"
          '';

          # Environment variables
          NODE_ENV = "development";

          # Ensure offline-first: no network during build
          # (comment out for initial setup)
          # npm_config_offline = true;
        };

        # Build the extension
        packages.default = pkgs.stdenv.mkDerivation {
          pname = "rescript-evangeliser";
          version = "0.1.0";

          src = ./.;

          buildInputs = [ nodejs ];

          buildPhase = ''
            cd extension

            # Install dependencies
            npm ci --offline

            # Compile TypeScript
            npm run compile

            # Run tests
            npm test

            # Package extension
            npx vsce package --no-dependencies
          '';

          installPhase = ''
            mkdir -p $out
            cp *.vsix $out/
            cp -r out $out/
          '';

          meta = with pkgs.lib; {
            description = "VS Code extension for learning ReScript through progressive code transformation";
            homepage = "https://github.com/Hyperpolymath/rescript-evangeliser";
            license = with licenses; [ mit ]; # Dual: MIT or Palimpsest
            platforms = platforms.all;
            maintainers = [ "Hyperpolymath" ];
          };
        };

        # Checks (run with: nix flake check)
        checks = {
          # Type checking
          typescript = pkgs.runCommand "typescript-check" {
            buildInputs = [ nodejs ];
          } ''
            cd ${self}
            cd extension
            npm ci --offline
            npx tsc --noEmit
            touch $out
          '';

          # Linting
          eslint = pkgs.runCommand "eslint-check" {
            buildInputs = [ nodejs ];
          } ''
            cd ${self}
            cd extension
            npm ci --offline
            npm run lint
            touch $out
          '';

          # Tests
          tests = pkgs.runCommand "run-tests" {
            buildInputs = [ nodejs ];
          } ''
            cd ${self}
            cd extension
            npm ci --offline
            npm test
            touch $out
          '';

          # RSR compliance
          rsr-compliance = pkgs.runCommand "rsr-check" {
            buildInputs = [ ];
          } ''
            cd ${self}

            # Documentation
            test -f README.md || (echo "Missing README.md" && exit 1)
            test -f CONTRIBUTING.md || (echo "Missing CONTRIBUTING.md" && exit 1)
            test -f CODE_OF_CONDUCT.md || (echo "Missing CODE_OF_CONDUCT.md" && exit 1)
            test -f SECURITY.md || (echo "Missing SECURITY.md" && exit 1)
            test -f MAINTAINERS.md || (echo "Missing MAINTAINERS.md" && exit 1)
            test -f CHANGELOG.md || (echo "Missing CHANGELOG.md" && exit 1)

            # Licenses
            test -f LICENSE-MIT.txt || (echo "Missing LICENSE-MIT.txt" && exit 1)
            test -f LICENSE-PALIMPSEST.txt || (echo "Missing LICENSE-PALIMPSEST.txt" && exit 1)

            # .well-known/
            test -f .well-known/security.txt || (echo "Missing security.txt" && exit 1)
            test -f .well-known/ai.txt || (echo "Missing ai.txt" && exit 1)
            test -f .well-known/humans.txt || (echo "Missing humans.txt" && exit 1)

            # Build system
            test -f justfile || (echo "Missing justfile" && exit 1)

            echo "✅ RSR Bronze compliance verified!" > $out
          '';
        };

        # Apps (run with: nix run)
        apps.default = {
          type = "app";
          program = "${pkgs.writeShellScript "rescript-evangeliser" ''
            echo "Building ReScript Evangeliser..."
            ${self.packages.${system}.default}/bin/rescript-evangeliser
          ''}";
        };
      }
    );
}
