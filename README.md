# Happy Paws Animal Shelter

Animal shelter website built from a Figma design, powered by **Strapi CMS** and deployed as a **Next.js static export** to **GitHub Pages**.

**Live site:** https://AIR-Modern-Studio.github.io/happypaws

---

## Architecture

```
Strapi (CMS)          Next.js (SSG)
hosted on Railway  →  static export
                       source on GitHub
       │                     │
       │ webhook on publish   │ GitHub Actions
       ▼                     ▼
triggers rebuild     deploys to GitHub Pages
```

Content is fetched from Strapi at **build time**. When a content editor publishes a change in Strapi, a webhook triggers a GitHub Actions workflow that rebuilds and redeploys the site automatically.

---

## Tech Stack

| Layer | Technology | Hosting |
|---|---|---|
| CMS | Strapi (latest) | Railway (free tier) |
| Frontend | Next.js 14 (static export) | GitHub Pages |
| Styling | CSS Modules + CSS custom properties | — |
| Contact / forms | Formspree | — |
| CI/CD | GitHub Actions | — |

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, featured animals, adoption steps, CTA |
| `/adopt` | Browse animals with client-side species/age filtering |
| `/adopt/[slug]` | Animal detail — photos, stats, related animals |
| `/about` | Mission, values, team |
| `/volunteer` | Roles grid, sign-up form |
| `/blog` | Featured post + articles grid |
| `/blog/[slug]` | Full article |
| `/donate` | Donation form + impact panel |
| `/contact` | Info cards, contact form, hours, FAQ |

---

## Local Development

### Prerequisites

- Node.js 20+
- A running Strapi instance (see [Strapi setup](#strapi-setup))

### Install & run

```bash
npm install
cp .env.local.example .env.local   # set NEXT_PUBLIC_STRAPI_URL
npm run dev
```

Open http://localhost:3000/happypaws.

### Build static export

```bash
npm run build
# output in ./out/
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_STRAPI_URL` | Base URL of your Strapi instance, e.g. `https://your-app.railway.app` |

In CI, set this as a repository secret named `STRAPI_URL`.

---

## Strapi Setup

Deploy Strapi to Railway (free tier) and create the following content types:

**Collections:** `animal`, `blog-post`, `team-member`, `volunteer-role`, `adoption-step`, `page-hero`, `stat`

**Single types:** `site-setting`

Full field definitions are in [`PLAN.md`](../PLAN.md).

---

## CI/CD

The workflow at `.github/workflows/deploy.yml` runs on:

- Push to `main`
- `repository_dispatch` event of type `strapi-publish` (triggered by the Strapi webhook)

### Strapi webhook configuration

| Setting | Value |
|---|---|
| URL | `https://api.github.com/repos/AIR-Modern-Studio/happypaws/dispatches` |
| Method | POST |
| Header `Authorization` | `token <GITHUB_PAT>` |
| Header `Accept` | `application/vnd.github.v3+json` |
| Body | `{"event_type": "strapi-publish"}` |
| Triggers | Entry create, update, publish, delete |

---

## Design Tokens

All design tokens live in `styles/globals.css` as CSS custom properties, extracted from the Figma source file.

Primary color: `#f56b36` · Background cream: `#fffaf2` · Font: Inter
