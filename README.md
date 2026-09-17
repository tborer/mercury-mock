# Mercury Agent Hub (Mock)

A static, front-end-only mockup of an **"Agent Hub"** console for a Mercury-style business
banking product. It shows what a bank's control panel for AI agents could look like: a place to
provision an agent, constrain exactly what it is allowed to read and do, watch its activity in
real time, approve individual actions, and cut off its access instantly.

The demo centres on a fictional *Accounts Payable Copilot* — an agent that reconciles invoices,
drafts wire transfers, and sweeps idle cash into treasury, all under human-defined guardrails.

> **This is a mock.** There is no backend, no authentication, and no real banking API. All
> balances, transactions, endpoints, and audit logs are hard-coded sample data used to
> illustrate the interface.

## Features

### Agent provisioning
- Named agent profile ("Accounts Payable Copilot") with a live/revoked status badge.
- A read-only **MCP (Model Context Protocol) endpoint URL** with a copy button, representing how
  an MCP-compatible client such as Claude would connect to the agent profile.

### Granular scopes and guardrails
- **Context scopes** — toggles for what the agent may read: real-time account balances and
  transaction history for invoice reconciliation.
- **Action guardrails** — toggles for what the agent may do: draft wire transfers (always subject
  to human approval) and issue single-use virtual cards for approved vendors.
- **Hard limits** — a maximum autonomous execution amount in USD; anything above it is forced
  into human-in-the-loop approval.

### Activity and approval feed
- A live-indicator feed of agent actions, split into items that require action and purely
  informational events.
- **Approve / Reject** controls on pending actions. Approving a drafted wire animates the feed
  item and rewrites it as a completed, executed transaction.
- A **View Logic (Audit Trail)** link on every entry that opens a modal showing the agent's
  reasoning trace as JSON: timestamp, agent ID, trigger, the reason the action was escalated to a
  human, and the underlying API calls with status codes and a payload hash.

### Kill switch
- A prominent **Revoke Agent Access** button with a confirmation prompt. Confirming disables the
  button, flips the agent's status badge to "Revoked", and represents terminating all active
  sessions.

### Interface
- Dashboard shell with a sidebar (Dashboard, Transactions, Cards, and a Developers section with
  API Tokens and Agent Hub) and a two-column responsive layout.
- Dark, card-based visual design using CSS custom properties, the Inter typeface, and inline SVG
  icons — no UI framework or component library.

## Tech stack

- [Vite](https://vite.dev/) 8 as the dev server and build tool (the only dependency).
- Plain HTML, CSS, and vanilla JavaScript — no framework.
- `base: './'` in `vite.config.js` so built assets use relative paths and the site works from any
  GitHub Pages sub-path.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # produce a production build in dist/
npm run preview  # serve the production build locally
```

## Project structure

```
index.html        Full page markup: sidebar, scopes, activity feed, audit-trail modal
main.js           Interactivity: modal, approval simulation, kill switch
style.css         Design tokens, layout, and component styles
vite.config.js    Vite config (relative asset base for GitHub Pages)
public/           Static assets served as-is (favicon, icon sprite)
src/              Leftover files from the Vite starter template; not used by the page
```

## Deployment

`.github/workflows/deploy.yml` builds the site and publishes `dist/` to GitHub Pages on every
push to `main`, and can also be run manually via `workflow_dispatch`.
