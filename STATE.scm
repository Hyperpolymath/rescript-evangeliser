;;; STATE.scm — rescript-evangeliser
;; SPDX-License-Identifier: AGPL-3.0-or-later
;; SPDX-FileCopyrightText: 2025 Jonathan D.A. Jewell

(define metadata
  '((version . "0.1.0") (updated . "2025-12-17") (project . "rescript-evangeliser")))

(define current-position
  '((phase . "v0.1 - Initial Setup")
    (overall-completion . 25)
    (components
     ((rsr-compliance ((status . "complete") (completion . 100)))
      (scm-files ((status . "complete") (completion . 100)))
      (security-policy ((status . "complete") (completion . 100)))
      (ts-to-rescript ((status . "pending") (completion . 0)))
      (ci-cd ((status . "complete") (completion . 100)))
      (documentation ((status . "complete") (completion . 100)))))))

(define blockers-and-issues
  '((critical ())
    (high-priority
     (("TypeScript → ReScript conversion required" . "9 TS files, 4130 lines")))))

(define critical-next-actions
  '((immediate
     (("Convert extension.ts to ReScript" . critical)
      ("Convert types.ts to ReScript" . critical)))
    (this-week
     (("Convert pattern-library.ts" . high)
      ("Convert narrative.ts" . high)
      ("Set up ReScript build tooling" . high)))
    (this-month
     (("Full ReScript migration" . high)
      ("Add Containerfile for RSR Gold" . medium)))))

(define session-history
  '((snapshots
     ((date . "2025-12-15") (session . "initial") (notes . "SCM files added"))
     ((date . "2025-12-17") (session . "security-review") (notes . "Fixed security.txt expiry, reviewed SCM files, created roadmap")))))

(define state-summary
  '((project . "rescript-evangeliser") (completion . 25) (blockers . 1) (updated . "2025-12-17")))
