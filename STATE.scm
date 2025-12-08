;;; STATE.scm -- Project State Checkpoint for ReScript Evangeliser
;;; Format: Guile Scheme S-expressions
;;; Purpose: Track project context across Claude conversation sessions
;;;
;;; Usage:
;;;   - Upload this file at conversation start to restore context
;;;   - Download updated STATE.scm at session end
;;;   - Edit blockers, next actions, and notes manually if needed

(define state
  '(
    ;; =========================================================================
    ;; METADATA
    ;; =========================================================================
    (metadata
      (format-version "2.0")
      (schema-version "2025-12-06")
      (created "2024-11-22T00:00:00Z")
      (updated "2025-12-08T00:00:00Z")
      (generator "Claude Code / rescript-evangeliser"))

    ;; =========================================================================
    ;; USER CONTEXT
    ;; =========================================================================
    (user
      (name "Hyperpolymath")
      (roles ("maintainer" "developer" "architect"))
      (language-preferences
        (favored ("ReScript" "TypeScript" "Scheme" "Nix"))
        (neutral ("JavaScript"))
        (avoided ()))
      (tool-preferences
        ("VS Code" "Guix" "Nix" "Git" "npm"))
      (values
        ("emotional-safety" "type-safety" "offline-first" "open-source"
         "reproducibility" "accessibility" "compassionate-teaching")))

    ;; =========================================================================
    ;; SESSION CONTEXT
    ;; =========================================================================
    (session
      (conversation-id "claude/create-state-scm-01ND4yCNbYsfM9mkm4TvwYDk")
      (started "2025-12-08T00:00:00Z")
      (messages-used 1)
      (messages-limit 100)
      (tokens-remaining "available"))

    ;; =========================================================================
    ;; CURRENT FOCUS
    ;; =========================================================================
    (focus
      (project "rescript-evangeliser")
      (phase "mvp-v1")
      (deadline #f)  ; No hard deadline
      (blocking ()))  ; Not blocking other projects

    ;; =========================================================================
    ;; PROJECT CATALOG
    ;; =========================================================================
    (projects

      ;; -----------------------------------------------------------------------
      ;; MAIN PROJECT: ReScript Evangeliser
      ;; -----------------------------------------------------------------------
      (project
        (name "rescript-evangeliser")
        (status in-progress)
        (completion 65)
        (category "education")
        (phase "mvp-v1")
        (description "VS Code extension teaching JavaScript developers ReScript through progressive code transformation with compassionate pedagogy")
        (dependencies ())
        (blockers
          ("WYSIWYG editor view not implemented"
           "VS Code marketplace publishing not configured"
           "Pattern detection relies on regex - AST parsing partially implemented"))
        (next
          ("Implement WYSIWYG block-based visual editor (Phase 4)"
           "Set up VS Code marketplace publishing"
           "Enhance AST-based pattern detection"
           "Add tutorial system with gamification (Phase 5)"))
        (chat-refs ())
        (notes
          "Philosophy: Celebrate good, minimize bad, show better. Never shame developers.
           RSR Bronze compliant. TPCF Perimeter 3 (community sandbox).
           Dual licensed: MIT + Palimpsest v0.8"))

      ;; -----------------------------------------------------------------------
      ;; SUB-PROJECT: Pattern Library
      ;; -----------------------------------------------------------------------
      (project
        (name "pattern-library")
        (status complete)
        (completion 100)
        (category "education")
        (phase "complete")
        (description "50+ JavaScript-to-ReScript transformation patterns across 10 categories")
        (dependencies ("rescript-evangeliser"))
        (blockers ())
        (next ())
        (chat-refs ())
        (notes
          "Categories: null-safety (8), async (6), error-handling (5), array-operations (8),
           conditionals, destructuring, functional, variants, modules, templates.
           Each pattern includes: jsPattern, rescriptExample, narrative, glyphs, tags,
           learningObjectives, commonMistakes, bestPractices"))

      ;; -----------------------------------------------------------------------
      ;; SUB-PROJECT: Glyph System
      ;; -----------------------------------------------------------------------
      (project
        (name "glyph-system")
        (status complete)
        (completion 100)
        (category "accessibility")
        (phase "complete")
        (description "21 Makaton-inspired visual symbols for transcending syntax barriers")
        (dependencies ("rescript-evangeliser"))
        (blockers ())
        (next ())
        (chat-refs ())
        (notes
          "Core glyphs: Transform, Target, Shield, Flow, Branch, Package, Chain,
           Crystal, Hourglass, Check, Lightbulb, etc.
           Designed for visual learners and accessibility"))

      ;; -----------------------------------------------------------------------
      ;; SUB-PROJECT: Narrative System
      ;; -----------------------------------------------------------------------
      (project
        (name "narrative-system")
        (status complete)
        (completion 100)
        (category "education")
        (phase "complete")
        (description "Encouraging message generation following compassionate pedagogy")
        (dependencies ("rescript-evangeliser"))
        (blockers ())
        (next ())
        (chat-refs ())
        (notes
          "5-part narrative structure: celebrate, minimize, better, safety, example.
           Never shames developers. Uses 'You were close!' philosophy."))

      ;; -----------------------------------------------------------------------
      ;; SUB-PROJECT: Four-Layer UI
      ;; -----------------------------------------------------------------------
      (project
        (name "four-layer-ui")
        (status in-progress)
        (completion 75)
        (category "ui")
        (phase "phase-4-pending")
        (description "RAW, FOLDED, GLYPHED, WYSIWYG view layers")
        (dependencies ("rescript-evangeliser" "pattern-library" "glyph-system"))
        (blockers
          ("WYSIWYG view not implemented - currently shows placeholder"))
        (next
          ("Implement WYSIWYG block-based visual editor"
           "Add interactive code blocks"
           "Enable real-time transformation preview"))
        (chat-refs ())
        (notes
          "RAW: Side-by-side comparison with narrative (complete)
           FOLDED: Collapsible sections (complete)
           GLYPHED: Symbol-annotated code (complete)
           WYSIWYG: Block-based visual editor (TODO)"))

      ;; -----------------------------------------------------------------------
      ;; SUB-PROJECT: Tutorial System
      ;; -----------------------------------------------------------------------
      (project
        (name "tutorial-system")
        (status paused)
        (completion 10)
        (category "education")
        (phase "foundation")
        (description "Guided learning with gamification elements")
        (dependencies ("rescript-evangeliser" "pattern-library" "four-layer-ui"))
        (blockers
          ("Waiting for WYSIWYG editor completion"
           "Achievement system not designed"))
        (next
          ("Design tutorial progression flow"
           "Create beginner-friendly introductory tutorial"
           "Implement achievement/badge system"))
        (chat-refs ())
        (notes "Phase 5 feature. Types defined but implementation pending."))

      ;; -----------------------------------------------------------------------
      ;; SUB-PROJECT: Multi-Language Support
      ;; -----------------------------------------------------------------------
      (project
        (name "multi-language-support")
        (status paused)
        (completion 0)
        (category "expansion")
        (phase "planning")
        (description "Support for Elm, Haskell, PureScript transformations")
        (dependencies ("rescript-evangeliser" "pattern-library" "tutorial-system"))
        (blockers
          ("Dependent on core MVP completion"
           "Requires pattern abstraction layer"))
        (next
          ("Research common patterns across functional languages"
           "Design language-agnostic pattern format"))
        (chat-refs ())
        (notes "Phase 6 feature. Long-term roadmap item.")))

    ;; =========================================================================
    ;; CRITICAL NEXT ACTIONS
    ;; =========================================================================
    (critical-next
      ((priority 1)
       (action "Implement WYSIWYG block-based visual editor")
       (project "four-layer-ui")
       (deadline #f))

      ((priority 2)
       (action "Configure VS Code marketplace publishing")
       (project "rescript-evangeliser")
       (deadline #f))

      ((priority 3)
       (action "Enhance AST-based pattern detection to replace regex")
       (project "rescript-evangeliser")
       (deadline #f))

      ((priority 4)
       (action "Design and implement tutorial progression system")
       (project "tutorial-system")
       (deadline #f)))

    ;; =========================================================================
    ;; QUESTIONS FOR USER
    ;; =========================================================================
    (questions
      (question
        (id 1)
        (topic "marketplace-publishing")
        (text "Do you want to publish to VS Code Marketplace now or wait for MVP v1 completion?")
        (context "Extension is functional but WYSIWYG view is incomplete"))

      (question
        (id 2)
        (topic "wysiwyg-priority")
        (text "Should WYSIWYG editor be the next priority, or would you prefer focusing on tutorial system first?")
        (context "WYSIWYG is Phase 4, Tutorials are Phase 5"))

      (question
        (id 3)
        (topic "ast-parsing")
        (text "Current pattern detection uses regex with Babel AST as fallback. Should we fully migrate to AST-only detection?")
        (context "Regex is faster but less accurate; AST is more reliable but adds complexity"))

      (question
        (id 4)
        (topic "telemetry")
        (text "Privacy-preserving telemetry is implemented but disabled by default. Any plans to set up a telemetry backend?")
        (context "Could help understand usage patterns for improving the extension"))

      (question
        (id 5)
        (topic "rescript-examples")
        (text "Should we add actual ReScript example projects beyond the current Project 1: Stack reference?")
        (context "Could demonstrate real-world ReScript usage patterns")))

    ;; =========================================================================
    ;; KNOWN ISSUES
    ;; =========================================================================
    (issues
      (issue
        (id 1)
        (severity "medium")
        (title "WYSIWYG view shows placeholder")
        (description "The fourth view layer is not implemented, showing only a 'Coming Soon' message")
        (affected "four-layer-ui")
        (workaround "Use RAW, FOLDED, or GLYPHED views"))

      (issue
        (id 2)
        (severity "low")
        (title "Pattern detection confidence varies")
        (description "Some regex patterns have lower confidence scores and may produce false positives")
        (affected "pattern-library")
        (workaround "Review detected patterns manually"))

      (issue
        (id 3)
        (severity "low")
        (title "Learning progress persistence")
        (description "Learning progress stored in VS Code globalState may be lost on extension reset")
        (affected "rescript-evangeliser")
        (workaround "Export progress periodically")))

    ;; =========================================================================
    ;; HISTORY / SNAPSHOTS
    ;; =========================================================================
    (history
      (snapshot
        (date "2024-11-22")
        (completions
          (("rescript-evangeliser" . 60)
           ("pattern-library" . 100)
           ("glyph-system" . 100)
           ("narrative-system" . 100)
           ("four-layer-ui" . 70)
           ("tutorial-system" . 5)
           ("multi-language-support" . 0))))

      (snapshot
        (date "2025-12-08")
        (completions
          (("rescript-evangeliser" . 65)
           ("pattern-library" . 100)
           ("glyph-system" . 100)
           ("narrative-system" . 100)
           ("four-layer-ui" . 75)
           ("tutorial-system" . 10)
           ("multi-language-support" . 0)))))

    ;; =========================================================================
    ;; SESSION FILES
    ;; =========================================================================
    (session-files
      (created ("STATE.scm"))
      (modified ()))

    ;; =========================================================================
    ;; LONG-TERM ROADMAP
    ;; =========================================================================
    (roadmap
      (phase
        (number 1)
        (name "Core Extension")
        (status complete)
        (description "10 foundational patterns, RAW view, basic UI"))

      (phase
        (number 2)
        (name "Pattern Expansion")
        (status complete)
        (description "50+ patterns, AST parsing, advanced patterns"))

      (phase
        (number 3)
        (name "View Layers")
        (status complete)
        (description "FOLDED and GLYPHED views implemented"))

      (phase
        (number 4)
        (name "WYSIWYG Editor")
        (status in-progress)
        (description "Block-based visual editor for transformations"))

      (phase
        (number 5)
        (name "Tutorial System")
        (status planned)
        (description "Gamification, achievements, guided learning paths"))

      (phase
        (number 6)
        (name "Multi-Language")
        (status planned)
        (description "Elm, Haskell, PureScript support")))

    ;; =========================================================================
    ;; MVP V1 DEFINITION
    ;; =========================================================================
    (mvp-v1
      (criteria
        ("All four view layers functional (RAW, FOLDED, GLYPHED, WYSIWYG)"
         "50+ patterns with comprehensive narratives"
         "VS Code Marketplace publication"
         "Performance targets met (<300ms detection, <100MB memory)"
         "RSR Bronze compliance maintained"
         "Basic tutorial/getting started guide"))
      (status "in-progress")
      (completion 75)
      (blockers
        ("WYSIWYG editor not implemented"
         "Marketplace publishing not configured")))))

;;; End of STATE.scm
