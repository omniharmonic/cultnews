# Cult News — cultnews.news

**The wire service of the end of the world.** An in-world, diegetic third-party
news publication that covers the exponential rise of apocalyptic movements —
including **the Herd of God** — for the immersive theatrical production
*The Herd of God*.

> Cult News is the in-world press desk of *The Herd of God*. Every group we cover
> is invented. The dread is real.

It is one of three lenses on one world:

- **Cult News** (this repo) — the *outside* view: a credible press outlet.
- **[Astral Spaceways](https://astralspaceways.com)** — the cult's *own* commercial front.
- **[herdofgod.com](https://herdofgod.com)** — the *internal* record.

---

## Stack

Static [Jekyll](https://jekyllrb.com) site, built natively by **GitHub Pages**
(no CI step). Markdown + YAML front-matter; the whole paper assembles from the
`_posts` collection. Adding a story is adding one file — no code changes.

## Repository layout

```
_config.yml            # site config (baseurl, production email, Web3Forms key)
index.html             # front page (home layout)
index-page.html        # /index/ — THE CULT INDEX (data page)
about.md · tips.html · thanks.html · 404.html
ai.html · newage.html · … · herd.html · investigations.html   # section/hub pages
_layouts/    default · home · article · section · index-page · page
_includes/   head · nameplate · nav · index-rail · story-card · byline · footer · ticker · section-tag
_posts/      YYYY-MM-DD-slug.md — every article
_data/       site.yml · cult_index.yml · cults.yml
assets/      css/style.css · js/{theme,tips}.js · img/ · fonts/ (self-hosted woff2)
```

## Add a story

Drop a file in `_posts/` named `YYYY-MM-DD-a-slug.md`:

```yaml
---
layout: article
title: "Headline in Playfair"
deck: "One-sentence deck, Source Serif, slate."
section: ai        # ai|newage|eastern|money|ascension|unification|ends|herd|investigations
tags: [ai, feature]
byline: "Dev Okafor"
dateline: "SONOMA, Calif."
date: 2026-08-01
related: [some-other-slug, another-slug]   # optional; slugs = filename minus date
image: /assets/img/art.svg                 # optional
---

Body in markdown. At most one blockquote (renders as a pull-quote).
```

It auto-lists on its section page, the front page, and — if tagged `herd` — the
Herd hub. The `/herd/` hub is a **tag** filter, so an Ends obituary tagged
`herd` shows up there too.

## The Cult Index

Hand-authored numbers in `_data/cult_index.yml` power the front-page rail and the
`/index/` page (totals, the formations-per-year sparkline, the tension meter, the
taxonomy, and Cult of the Week). Purely presentational — an argument as an
instrument. Bump the numbers intentionally; it's more in-character than analytics.

## Local development

System Ruby is too old on many Macs; build in a container that matches Pages:

```bash
docker run --rm -it -v "$PWD":/srv/jekyll -p 4000:4000 \
  jekyll/jekyll:4 jekyll serve --watch --host 0.0.0.0 --baseurl /cultnews
# → http://localhost:4000/cultnews/
```

Or with a local Ruby ≥ 3.1: `bundle install && bundle exec jekyll serve`.

## Tips form

`tips.html` posts to [Web3Forms](https://web3forms.com) bound to the production
email. Set `web3forms_key` in `_config.yml` to enable live delivery; until then
the form falls back to a prefilled `mailto:`. Honeypots + no-JS `/thanks/`
redirect included. No accounts, no tracking — email + message only.

## Deploy (GitHub Pages)

1. Push to `main` on the production repo.
2. **Settings → Pages → Deploy from branch → `main` / root.** Pages builds Jekyll.
3. Custom domain: add `cultnews.news` (writes `CNAME`), point DNS at GitHub,
   enable **Enforce HTTPS**, and set `url: https://cultnews.news` + `baseurl: ""`
   in `_config.yml`.

## Guardrails

Everything is invented; no real person or ongoing organization is reported as
fact. The satire targets apocalyptic-cult *dynamics* — grift, control,
doom-certainty — never a real people or a sincere faith tradition. A permanent
fiction seam lives in the footer and on `/about/`.

*Built for* The Herd of God *· Benjamin Life ([@omniharmonic](https://twitter.com/omniharmonic)).*
