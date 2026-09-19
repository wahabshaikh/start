# Architecture

## Default topology

```text
Web (vinext on Cloudflare Workers) ─┐
                                   ├─> API Worker ─> D1 / R2 / KV / Queues
Expo iOS app ──────────────────────┘
```

Auth is served by the API Worker using Better Auth so the web and Expo clients share one identity system.

## Boundaries

- `apps/web`: presentation and web-only behavior.
- `apps/mobile`: native presentation and device behavior.
- `apps/api`: HTTP API, authentication, background queue consumers.
- `packages/ui`: shared web-only shadcn components.
- Add framework-independent domain packages under `packages/` when logic is reused.

## Observability

- DataFast: product/marketing analytics.
- Cloudflare logs: runtime diagnostics.
- Crisp: support conversations and support-triggered product signals.

## Testing

- Web browser behavior: Playwright.
- Worker logic: Cloudflare-compatible Vitest tests when introduced.
- iOS flows: Maestro locally on the Mac worker and independently through EAS Workflows.
