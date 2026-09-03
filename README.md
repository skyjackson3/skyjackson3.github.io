# Digital Pour-Over

Sky Jackson's blog, with the professional material folded in behind it. Built
with Jekyll, published by GitHub Pages. GitHub compiles the site on its own
servers, so publishing is: edit a file, commit, push.

**Structure**

- `/` — the blog. One featured post, then the recent stream.
- `/archive/` — every post, grouped by year.
- `/photographs/` — the contact sheet.
- `/about/` — who you are, selected work, work history, and how to reach you.

---

## Getting it online

**1. Make the repository.** On GitHub, create a repo named
`YOUR-USERNAME.github.io` (your exact username publishes the site at the root
of your GitHub domain). Keep it public — Pages requires that on free accounts.

**2. Push these files into it.**

```bash
cd sky-jackson-site
git init
git add .
git commit -m "First build"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
git push -u origin main
```

**3. Turn on Pages.** Repo → Settings → Pages → Source: *Deploy from a branch*
→ Branch `main`, folder `/ (root)`. Save. The first build takes a couple of
minutes; after that it's usually under 60 seconds.

**4. Fix the URL.** In `_config.yml`, set `url` to your real address. If you
named the repo anything other than `USERNAME.github.io`, also set
`baseurl: "/repo-name"` or every link and image will 404.

**Custom domain (optional).** Add a file named `CNAME` at the repo root
containing just your domain, point a CNAME DNS record at
`YOUR-USERNAME.github.io`, then enable *Enforce HTTPS* in Settings → Pages.

---

## Writing a post

Create `_posts/2026-09-14-your-title.md`:

```markdown
---
title: "Your title"
lede: "One sentence. It shows under the headline, in listings, and in search results."
date: 2026-09-14 08:00:00 -0600
---

Write in Markdown from here.
```

Commit and push. That's the whole workflow.

**Featuring a post.** Add `featured: true` to its front matter and it takes the
large slot at the top of the home page. Keep it on one post at a time; with
none set, the newest post is featured automatically.

**Drafts.** Put unfinished pieces in a `_drafts/` folder with no date in the
filename. They stay off the published site.

---

## Where everything else lives

| What you want to change | File |
| --- | --- |
| Site name, tagline, contact links, portrait | `_config.yml` |
| How many posts show on the home page | `_config.yml` → `home_posts` |
| About-page prose | `about.html` |
| Work history, education, skills | `_data/resume.yml` |
| Selected work samples | `_data/writing.yml` |
| Photographs | `_data/portfolio.yml` |
| Colors, type, spacing | `assets/css/main.css` |

Everything I couldn't fill in is marked `TODO`. Find them all at once:

```bash
grep -rn "TODO" _data _config.yml about.html
```

---

## Adding photographs

1. Export at roughly 1600px on the long edge, JPEG quality 80. Larger just
   slows the page down.
2. Drop the file in `assets/img/work/`.
3. Add a block to `_data/portfolio.yml`.
4. Write a real `alt` description. Screen readers use it, and so does Google.

The placeholder JPEGs exist only so the site isn't full of broken images before
you add your own. Delete them as you replace them.

---

## Migrating Digital Pour-Over from Bear Blog

1. In Bear Blog: Dashboard → Settings → Export, and download the markdown
   export.
2. Unzip it, then run:

```bash
python3 tools/import_bearblog.py ~/Downloads/bear-export _posts
```

It pulls the title and publication date from each file, renames it to Jekyll's
`YYYY-MM-DD-slug.md` convention, and writes the front matter. Originals are
left untouched, and it asks before overwriting anything.

3. Skim the results — Bear's exports vary, and dates occasionally need fixing.
4. Delete `_posts/2026-08-22-first-pour.md`, which is only a placeholder.
5. **Leave a forwarding trail.** If old Bear Blog links are out in the world,
   keep that blog up with a short post pointing here rather than deleting it.

---

## Previewing locally (optional)

You don't need this — GitHub builds the site for you. But if you want to see
changes before they're public:

```bash
bundle install
bundle exec jekyll serve --livereload
```

Then open `http://localhost:4000`. Requires Ruby.

---

## Notes

- Accessible by default: keyboard-navigable lightbox, visible focus rings,
  reduced-motion respected, and contrast that clears WCAG AA. Keep that true
  when editing colors.
- `jekyll-seo-tag`, `jekyll-feed`, and `jekyll-sitemap` are on. The feed lives
  at `/feed.xml`, the sitemap at `/sitemap.xml`.
- Post URLs are `/YEAR/MONTH/slug/`. Changing `permalink` in `_config.yml`
  later will break any links already shared, so decide now if you dislike it.
- Fonts load from Google Fonts. To self-host, download the woff2 files into
  `assets/fonts/` and replace the `<link>` in `_includes/head.html` with
  `@font-face` rules.
