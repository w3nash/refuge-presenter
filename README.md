# Refuge Presenter

Refuge Presenter is a church presentation tool for running lyrics, scripture, and media on screens during services. It aims to be an open source alternative to ProPresenter, with a similar feature set and familiar tools so volunteers who know ProPresenter can find their way around.

The project is in early development.

## Repository layout

| Path           | What it is                                                      |
| -------------- | --------------------------------------------------------------- |
| `apps/desktop` | The presenter app: Tauri v2 with a TanStack Router SPA frontend |
| `apps/web`     | Docs and marketing site, built with TanStack Start              |
| `packages/ui`  | Shared shadcn/ui components, hooks, and theme (`@workspace/ui`) |

## Requirements

- [Bun](https://bun.sh) 1.4.3
- Node.js 24 or newer
- For the desktop app: Rust and the [Tauri v2 prerequisites](https://v2.tauri.app/start/prerequisites/) for your OS

## Getting started

```bash
bun install
bun run dev
```

`bun run dev` starts every app through Turborepo. To run one app:

```bash
bunx turbo dev --filter=desktop
bunx turbo dev --filter=web
```

The desktop app opens a native window, and its first run compiles the Rust side, which takes a few minutes.

## Commands

Run these from the repo root:

| Command                | What it does                                                                 |
| ---------------------- | ---------------------------------------------------------------------------- |
| `bun run dev`          | Start all apps in dev mode                                                   |
| `bun run build`        | Build all apps (the desktop build produces a release `.app`/`.dmg` on macOS) |
| `bun run typecheck`    | Type-check every package                                                     |
| `bun run lint`         | Lint every package                                                           |
| `bun run test`         | Run every package's tests                                                    |
| `bun run format`       | Format the repo with Prettier                                                |
| `bun run format:check` | Check formatting without writing changes                                     |

## Versioning

Refuge Presenter follows [Semantic Versioning](https://semver.org/). Releases are cut manually with the **Release** workflow in the Actions tab, which runs [release-please](https://github.com/googleapis/release-please). Each run reads the Conventional Commit titles merged into `main` and opens or updates a release pull request with the next version and an updated `CHANGELOG.md`. After merging that pull request, run the workflow once more to tag the release (`vX.Y.Z`) and publish it on GitHub.

The version lives in the root `package.json`, `apps/desktop/package.json`, and `apps/desktop/src-tauri/Cargo.toml`, and release-please updates all three. The desktop app reads its version from `apps/desktop/package.json`. Before 1.0, breaking changes bump the minor version.

## UI components

Components live in `packages/ui` and both apps import them from `@workspace/ui`:

```tsx
import { Button } from "@workspace/ui/components/button"
```

To add a shadcn component, run this from the repo root with the app you're working on:

```bash
bunx --bun shadcn@latest add <component> -c apps/desktop
```

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. Contributors sign the [Contributor License Agreement](CLA.md) once, on their first pull request. Everyone taking part follows the [Code of Conduct](CODE_OF_CONDUCT.md). Report security issues privately as described in [SECURITY.md](SECURITY.md).

## License

Copyright (C) 2026 Jonash Marcelino

- **Code:** [GNU General Public License v3.0 or later](LICENSE).
- **Documentation text:** [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- **Name and logo:** not covered by either license. See [TRADEMARKS.md](TRADEMARKS.md).
