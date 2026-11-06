# DevFlow

**Pet project** — a Stack Overflow–style Q&A app: browse questions, filters and search, tags and community listings, rich-text questions via TinyMCE, and Clerk-backed auth. The UI uses a three-column shell (sidebars + main), light/dark theming, and shadcn-style Radix components.

## What’s inside (from the repo)

| Area | Notes |
|------|--------|
| **Framework** | Next.js **15.5** (App Router), React 18, TypeScript |
| **Auth** | [Clerk](https://clerk.com) (`@clerk/nextjs` v7) — [`middleware.ts`](middleware.ts) uses `clerkMiddleware` + public route matcher (home, questions, tags, community, sign-in/up, API webhook, etc.); UI uses `Show` for signed-in / signed-out blocks |
| **Database** | MongoDB via [Mongoose](https://mongoosejs.com) 8.x; models under [`database/`](database/) (`Question`, `Tag`, `User` with votes, answers, views) |
| **Server data** | Server Actions in [`lib/actions/`](lib/actions/) (`question`, `user`, `tag`) — list/filter questions, create questions, user/tag queries |
| **Webhooks** | [`app/api/webhook/route.ts`](app/api/webhook/route.ts) — Clerk → Svix verification → sync users on create/update/delete |
| **Forms / validation** | React Hook Form + Zod ([`lib/validations.ts`](lib/validations.ts)), TinyMCE for ask-question body (`NEXT_PUBLIC_TINY_EDITOR_API_KEY`) |
| **Styling** | Tailwind CSS 3, `tailwindcss-animate`, typography plugin, lucide icons |

Deployment target in your setup is **Vercel** (env vars such as `MONGO_DB_URL`, Clerk keys, and `WEBHOOK_SECRET` are expected there or in `.env.local`).

## Getting Started

Use **Node.js 22+** (`package.json` [`engines.node`](package.json)). If you use nvm/fnm, see `.nvmrc` (local-only; may be gitignored in some setups).

```bash
npm install
```

Add environment variables locally (not committed), for example:

- `MONGO_DB_URL` — MongoDB Atlas SRV URI (`authSource=admin`, encoded password if embedded in the URI)
- Clerk: `NEXT_PUBLIC_CLERK_*`, `CLERK_SECRET_KEY`
- `WEBHOOK_SECRET` — Clerk webhook signing secret
- `NEXT_PUBLIC_TINY_EDITOR_API_KEY` — Tiny Cloud editor key (optional for rich text)

Then:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

If the project is linked to Vercel, you can pull remote env into `.env.local`:

```bash
vercel env pull .env.local
```

## Scripts

- `npm run dev` — development server  
- `npm run build` — production build  
- `npm run start` — production server  
- `npm run lint` — ESLint  

## Cursor: browser MCP (Playwright)

When present, [`.cursor/mcp.json`](.cursor/mcp.json) enables the **playwright** MCP (Chromium, headless) for this workspace. Output can go under `.cache/playwright-mcp/` (gitignored). The whole `.cursor/` folder may be gitignored.

## Dependency / security

Stack targets current patched minors (Next 15.5.x, Mongoose 8.x, Zod 4.x, etc.). Run `npm audit` after upgrades.

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Next.js](https://clerk.com/docs/quickstarts/nextjs)
- [MongoDB Atlas](https://www.mongodb.com/docs/atlas/)
