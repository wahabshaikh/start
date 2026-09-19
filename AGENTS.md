# Agent instructions

## Architecture rules

- Backend infrastructure must run on Cloudflare unless a native Apple tool explicitly requires macOS.
- Web uses vinext, not a Vercel-specific runtime.
- Mobile uses Expo SDK 55+ and development builds; do not assume Expo Go.
- API logic lives in `apps/api`. Do not duplicate business rules inside web route handlers.
- D1 is the default relational store, R2 for objects, KV for read-heavy ephemeral/config data, Queues for asynchronous work, Durable Objects only when strong coordination is required.
- Better Auth is the authentication system for web and mobile.
- DataFast is the analytics source of truth.
- Crisp is the customer support surface.
- Use Hugeicons. Do not introduce Lucide unless a third-party component requires it internally.
- Use shadcn/ui for web primitives and keep the source components editable.

## Testing rules

Before marking a task complete:
1. typecheck affected workspaces;
2. build affected web/worker workspaces;
3. run Playwright for changed web user flows;
4. run Maestro for changed native user flows;
5. attach screenshots or recordings for visual changes when the agent environment supports it.

## Native execution

Normal code changes may run in a Linux cloud agent. Xcode, iOS Simulator, CocoaPods and native UI verification must run on the Mac worker or EAS.

## Git

One feature/fix per branch and PR. Keep commits scoped. Never commit secrets, Cloudflare resource credentials, Apple credentials, Expo tokens, DataFast IDs that are private, or Crisp private keys.
