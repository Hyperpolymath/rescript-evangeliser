;; SPDX-License-Identifier: AGPL-3.0-or-later
;; SPDX-FileCopyrightText: 2025 Jonathan D.A. Jewell
;; ECOSYSTEM.scm — rescript-evangeliser

(ecosystem
  (version "1.0.0")
  (name "rescript-evangeliser")
  (type "project")
  (purpose "> *Celebrate good, minimize bad, show better* — A VS Code extension that teaches JavaScript developers ReScript through progressive code transformation, without shame.")

  (position-in-ecosystem
    "Part of hyperpolymath ecosystem. Follows RSR guidelines.")

  (related-projects
    (project (name "rhodium-standard-repositories")
             (url "https://github.com/hyperpolymath/rhodium-standard-repositories")
             (relationship "standard")))

  (what-this-is "> *Celebrate good, minimize bad, show better* — A VS Code extension that teaches JavaScript developers ReScript through progressive code transformation, without shame.")
  (what-this-is-not "- NOT exempt from RSR compliance"))
