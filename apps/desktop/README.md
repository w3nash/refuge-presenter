# Refuge Presenter desktop

Tauri v2 app with a TanStack Router SPA frontend (Vite, React, Tailwind CSS v4). It has no server runtime: Tauri serves the static build from `dist/`.

## Commands

Run from `apps/desktop`, or from the repo root with `bunx turbo <task> --filter=desktop`.

| Command                   | What it does                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------- |
| `bun run dev`             | `tauri dev`: starts Vite on port 1420 and opens the native window                     |
| `bun run build`           | `tauri build`: release binary plus `.app`/`.dmg` in `src-tauri/target/release/bundle` |
| `bun run dev:frontend`    | Vite dev server only, in the browser                                                  |
| `bun run build:frontend`  | Vite production build to `dist/`                                                      |
| `bun run typecheck`       | `tsc --noEmit`                                                                        |
| `bun run lint`            | ESLint (`@tanstack/eslint-config`)                                                    |
| `bun run format`          | Prettier (root `.prettierrc`), then `eslint --fix`                                    |
| `bun run generate-routes` | Regenerates `src/routeTree.gen.ts` without starting Vite                              |

The Vite dev server must stay on port 1420 (`strictPort`) because `src-tauri/tauri.conf.json` loads `devUrl` from it.

## Routing

Routes are files in `src/routes`. The router plugin regenerates `src/routeTree.gen.ts` on every dev or build run; commit it and don't edit it by hand. `src/routes/__root.tsx` is the layout for every route and mounts the TanStack devtools, which the production build strips.

See the [TanStack Router docs](https://tanstack.com/router/latest/docs/framework/react/overview).

## Styling and components

`src/styles.css` imports `@workspace/ui/globals.css`, the shared theme from `packages/ui`. Components come from `@workspace/ui`:

```tsx
import { Button } from "@workspace/ui/components/button"
```

Add shadcn components from the repo root:

```bash
bunx --bun shadcn@latest add <component> -c apps/desktop
```

## Rust side

`src-tauri` holds the Tauri app (`src/lib.rs`), its config (`tauri.conf.json`), and permissions (`capabilities/`). See the [Tauri v2 docs](https://v2.tauri.app/).
