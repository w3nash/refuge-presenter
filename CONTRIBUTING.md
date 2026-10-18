# Contributing to Refuge Presenter

Thanks for helping build Refuge Presenter. This file covers how to set up the repo, what a pull request needs, and the contributor agreement.

By taking part you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md). Report security issues privately as described in [SECURITY.md](SECURITY.md), not in public issues.

## Before you start

For anything bigger than a small fix, open an issue first so we can agree on the approach before you write the code. Bug reports and feature requests use the issue templates.

## Setup

You need Bun 1.4.3, Node.js 24 or newer, and, for the desktop app, Rust and the [Tauri v2 prerequisites](https://v2.tauri.app/start/prerequisites/).

```bash
bun install
bunx turbo dev --filter=desktop
```

See the [README](README.md) for the repository layout and the other commands.

## Making a change

1. Fork the repo and create a branch from `main`.
2. Keep the pull request focused on one change.
3. Run the same checks CI runs, from the repo root:

   ```bash
   bun run format
   bun run lint
   bun run typecheck
   bun run test
   ```

   For changes under `apps/desktop/src-tauri`, also run `cargo fmt`, `cargo clippy --all-targets -- -D warnings`, and `cargo test` in that directory.

4. Open a pull request with a Conventional Commit title (see below) and fill in the template.

Shared UI goes in `packages/ui` so both apps can use it. Add shadcn components with `bunx --bun shadcn@latest add <component> -c apps/desktop` from the repo root.

## Commit messages

Pull requests are squash-merged, so the pull request title becomes the commit on `main`. A check requires it to follow [Conventional Commits](https://www.conventionalcommits.org/): `feat: add slide transitions`, `fix(desktop): keep output window on top`. Scopes are optional; use the package name (`desktop`, `web`, `ui`) when the change is limited to one.

The type sets the next version: `fix` releases a patch, `feat` a minor version, and a `!` after the type (`feat!:`) or a `BREAKING CHANGE:` footer marks a breaking change. Commits inside a pull request can use any message. Pull requests that only change `apps/web` don't affect the version, since it tracks the desktop app.

## Contributor License Agreement

Refuge Presenter is licensed under GPL-3.0-or-later. Every contributor signs the [Contributor License Agreement](CLA.md) once. Besides covering your contribution under the GPL, it lets the maintainer offer the project under other license terms in the future.

When you open your first pull request, a bot comments with a link to the agreement. To sign, reply on the pull request with:

```
I have read the CLA Document and I hereby sign the CLA
```

The bot records your signature, and later pull requests pass the check automatically. Comment `recheck` if the check doesn't update.

## License

Your contributions are published under [GPL-3.0-or-later](LICENSE), with the additional rights granted in the [CLA](CLA.md). Documentation text is published under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
