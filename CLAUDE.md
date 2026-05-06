# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static promotional landing page for **Billboard Salsa Music Week — Cali**, a salsa music event in Cali, Colombia. No build system, framework, or package manager. Open `salsa_music_week.html` directly in a browser to run.

## Development

No build, lint, or test commands. To preview: open `salsa_music_week.html` in any modern browser. For a local server:

```bash
python -m http.server 8080
# then visit http://localhost:8080/salsa_music_week.html
```

## Architecture

All HTML, CSS, and JavaScript live in a single file: `salsa_music_week.html` (~1,100 lines).

**Structure inside the file:**
- `<style>` block — all styles, CSS variables, animations
- `<body>` — 9 anchor-navigated sections: `#hero`, `#porque`, `#que-es`, `#actividades`, `#aliados`, `#ponentes`, `#schedule`, `#homenaje`, `#cta`
- `<script>` block — all JS at the bottom (~80 lines)

**JavaScript features (lines ~1020–1103):**
- Custom animated cursor (mouse-following ring)
- Nav glassmorphism on scroll
- Reveal-on-scroll via Intersection Observer
- Clickable dot navigation synced to sections
- Parallax background on scroll

**CSS design system:**
- Variables: `--crimson` (#C0122A), `--ember`, `--gold`, `--deep-dark`, `--cream`
- Glassmorphism via `backdrop-filter: blur(...)`
- Fonts: Playfair Display (headings), Bebas Neue (accents), DM Sans (body), custom `BROADW.TTF`

**Assets:**
- Root-level PNGs: logo files and background images (`fondo *.png`)
- `/Fondos/` directory: 20 background variation images
