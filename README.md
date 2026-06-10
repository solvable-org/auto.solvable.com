# auto.solvable.com

Consumer intake runtime for auto insurance — owned by Solvable, replacing the legacy Webflow + AdQuadrant form.

## What this is

A 14-step quote wizard that captures auto insurance leads and submits them to Cake (AdQuadrant) and LeadProsper in parallel. Built on Nuxt 4 with server-side API proxies so no credentials ever reach the browser.

**Live flow:** ZIP → Vehicle (Year / Make / Model) → Currently insured → Discounts → Profile (Gender / Credit / DOB) → Contact (Name / Address / Email / Phone) → Result

## Status

| Area | Status |
|---|---|
| Wizard UI — all 14 steps | ✅ Done |
| Store-first writes (no DOM reads at submit) | ✅ Done |
| TCPA consent + TrustedForm capture | ✅ Done |
| Jornaya LeadID capture | ✅ Done |
| NHTSA vehicle model lookup + cache | ✅ Done |
| GA4 event tracking per step | ✅ Done |
| Server API proxies (Cake, LP, MediaAlpha, Ringba) | ✅ Done |
| Config split (app.config non-secrets / runtimeConfig secrets) | ✅ Done |
| Real API keys wired (Cake + LeadProsper) | ⏳ Waiting on Humberto |
| Jornaya account ID configured | ⏳ Waiting on Humberto |
| AWS Lambda deploy | ⏳ Waiting on Anetto |
| CI/CD (GitHub Actions) | 🔵 Queued |
| Google Maps address autocomplete | 🔵 Queued |

## Running locally

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Copy `.env.example` to `.env` and fill in the API keys before testing real submissions.

## Environment variables

Only 5 real secrets — everything else lives in `app.config.ts` (versioned):

| Variable | What it is |
|---|---|
| `NUXT_PUBLIC_GTAG_ID` | GA4 measurement ID |
| `NUXT_CKM_KEY_DEFAULT` | Cake API key (pid default) |
| `NUXT_CKM_KEY_PID1921` | Cake API key (pid 1921) |
| `NUXT_LP_KEY` | LeadProsper API key (default) |
| `NUXT_LP_KEY_PID1921` | LeadProsper API key (pid 1921) |

## Scripts

```bash
pnpm dev        # dev server
pnpm build      # production build
pnpm start      # serve production build
pnpm preview    # preview build locally
```

## Key decisions

- **Store-first writes** — every card click writes to Vuex state immediately. The legacy Webflow form read the DOM at submit time, which caused discounts / gender / credit to always arrive empty at partners.
- **Server-side proxies** — Cake and LeadProsper keys never leave the server. All API calls go through Nitro routes under `server/api/`.
- **Always show result** — the wizard navigates to the result screen regardless of whether Cake/LP accepted the lead. MediaAlpha ads load independently.
- **Inline insurer** — the "insured with" dropdown appears on the same screen as "Are you currently insured?" to reduce perceived step count.
