# _dev-scripts/

This directory contains **development-only utility scripts** generated during the iterative build process of the AmpleTech AI website. These scripts were used to inspect, patch, and transform the Framer-exported HTML files.

**These files have zero role in the production Vite build.**

They are preserved here for reference. Once you are confident all transformations are stable and no rollback is needed, this entire directory can be safely deleted.

## Script Categories

| Pattern | Purpose |
|---|---|
| `find_*.cjs` | DOM inspection — locate elements, images, or sections |
| `fix_*.cjs` | Apply targeted fixes to HTML/CSS (arrows, grid, metrics, etc.) |
| `patch_*.cjs/js` | More complex multi-step HTML patching operations |
| `inspect_*.cjs` | Log structure details (containers, arrows, team, etc.) |
| `check_*.cjs` | Verification checks post-patch |
| `test_*.cjs/js` | One-off test scripts |
| `update_*.cjs` | Update specific content (logo, nav, hero copy, etc.) |
| `get_*.cjs/js` | Extract/dump specific HTML or CSS fragments |
| `parse_*.cjs` | Parse and analyze HTML structures |
| `list_*.cjs` | List images, sections, or elements |
| `print_*.cjs` | Print CSS rules or media queries to stdout |

## Safe to Delete?

Yes — when you're ready. These scripts do not affect `npm run dev`, `npm run build`, or the deployed website in any way.
