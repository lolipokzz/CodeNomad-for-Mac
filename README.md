# CodeNomad for Mac

**An OpenCode workspace for macOS, with focused UI performance improvements.**

Manage AI coding sessions, projects, Git worktrees and code reviews from one desktop app. This community fork of [CodeNomad by Neural Nomads](https://github.com/NeuralNomadsAI/CodeNomad) focuses on responsiveness on Mac, starting with long-message rendering.

**[Download for Apple Silicon](https://github.com/lolipokzz/CodeNomad-for-Mac/releases/download/v1.0.1/CodeNomad-Electron-macos-arm64-1.0.1.zip)** · [Releases](https://github.com/lolipokzz/CodeNomad-for-Mac/releases) · [Report an issue](https://github.com/lolipokzz/CodeNomad-for-Mac/issues)

![CodeNomad workspace with project tabs, nested sessions, a conversation timeline and the Status panel](docs/screenshots/workspace-0.20.png)

*Upstream CodeNomad interface shown with demonstration data.*

## Download and install

| Item | Current release |
| --- | --- |
| Version | v1.0.1 |
| Desktop shell | Electron |
| Processor | Apple Silicon — M-series, arm64 |
| Operating system | macOS 13.5 or newer |
| Download | ZIP archive, approximately 189 MB |
| Signing | Locally built, unsigned and unnotarized |

1. Download the **[application ZIP](https://github.com/lolipokzz/CodeNomad-for-Mac/releases/download/v1.0.1/CodeNomad-Electron-macos-arm64-1.0.1.zip)** from the release's **Assets** section. GitHub's **Source code** archives are for development.
2. Unzip it. For a first comparison, keep the app in a separate folder and quit any running CodeNomad with **⌘Q**.
3. Open `CodeNomad.app`. You can move it to **Applications** after testing.
4. Select an existing OpenCode executable or install a compatible version through the setup screen.
5. Open a project folder, connect your model provider and start a session.

The desktop bundle includes Node.js and npm. Git must be installed and available to the backend for repository and worktree features. The current OpenCode requirement is **2.2.3 or later**, with **2.2.5** as the recommended qualification target; see [runtime requirements](packages/server/src/opencode/runtime-support.ts).

For Intel Macs and other desktop platforms, see the [upstream releases](https://github.com/NeuralNomadsAI/CodeNomad/releases). This fork's ready-to-download build targets Apple Silicon.

### macOS launch checks

macOS may ask you to approve this unsigned app. After verifying the download's origin, use **System Settings → Privacy & Security → Open Anyway** if offered. On a managed work Mac, follow your organization's application policy.

You can verify the downloaded ZIP in Terminal:

```bash
shasum -a 256 ~/Downloads/CodeNomad-Electron-macos-arm64-1.0.1.zip
```

Expected SHA-256:

```text
c6cb5a55091ff3868fc40af090171eca005e521fb0946a4096c12f9c6b747cdc
```

## What this fork improves

The current changes target time spent processing message text on the UI thread:

- **Reuse unchanged visible text.** When a long response continues streaming beyond its displayed prefix, the Markdown cache reuses the prefix's HTML. Edits within the visible text, reveals and highlighting changes select the appropriate render.
- **Skip unnecessary formula scanning.** Ordinary paragraphs without paired display-math delimiters bypass the parser's character-by-character formula checks.
- **Keep performance work reproducible.** A parser benchmark and browser regression coverage are included alongside the changes.

These optimizations apply to the shared UI used by the desktop app. Overall responsiveness also depends on conversation content, available memory, the desktop shell and background work. Agent execution and model generation run through OpenCode and the selected provider.

### Compare on your Mac

Run each build separately with the same project and conversation. Compare typing, scrolling, switching sessions and responsiveness while a long reply streams. Record your Mac chip, RAM, macOS version and application version when reporting a result.

From a source checkout with dependencies installed, run the parser benchmark:

```bash
node --import tsx scripts/benchmark-markdown.mts
```

It reports the median and p95 parser time for a synthetic text sample. Compare runs on the same idle machine and Node version. UI layout and end-to-end application latency require separate profiling.

## Workspace features

CodeNomad for Mac retains the upstream workspace features:

- Multiple projects, tabs and restored window layouts.
- Nested agent sessions, conversation forks and full-history search.
- Git worktrees and change review.
- Markdown, code, diffs, attachments and tool-result images.
- MCP connections, plugins, background shells and web previews.
- Voice input, speech output and configurable interface languages.
- Browser and remote access through the CodeNomad backend.

OpenCode's shared background service owns sessions, messages and agent execution. Closing the desktop UI leaves that service running.

[User guide](docs/help/en/index.md) · [Server documentation](packages/server/README.md) · [Browser previews](dev-docs/BROWSER_AUTOMATION.md)

The server documentation also describes upstream npm distributions. Use this repository's source or release asset to run the fork's changes.

## Build from source

Use the Node.js version pinned in [`.node-version`](.node-version), Git and a compatible OpenCode executable.

```bash
git clone https://github.com/lolipokzz/CodeNomad-for-Mac.git
cd CodeNomad-for-Mac
npm ci --workspaces --include=optional
npm run dev
```

Create an Apple Silicon release build:

```bash
npm run build:mac-arm64 --workspace @neuralnomads/codenomad-electron-app
```

Build artifacts are written to `packages/electron-app/release/`.

### Checks

```bash
npm run typecheck --workspace @codenomad/ui
node --import tsx --test packages/ui/src/lib/markdown.test.ts
npx playwright install chromium
npm run test:browser --workspace @codenomad/ui
```

Some upstream browser tests use platform-specific keyboard shortcuts. On macOS, inspect failures involving Ctrl versus Command separately from rendering regressions.

See [BUILD.md](BUILD.md), [CONTRIBUTING.md](CONTRIBUTING.md) and [AGENTS.md](AGENTS.md) for the repository's development conventions.

## Report a performance problem

[Open an issue](https://github.com/lolipokzz/CodeNomad-for-Mac/issues) with:

- Mac model/chip, RAM and macOS version.
- CodeNomad and OpenCode versions.
- The action that stalls and whether a new empty conversation also stalls.
- Approximate conversation size and whether the agent is streaming.
- CPU usage and memory pressure in Activity Monitor during the slowdown.
- A short recording or reproduction steps, with private project content removed.

## Credits and license

CodeNomad is created and maintained upstream by **[Neural Nomads and contributors](https://github.com/NeuralNomadsAI/CodeNomad)**. This community fork is maintained at **[lolipokzz/CodeNomad-for-Mac](https://github.com/lolipokzz/CodeNomad-for-Mac)**.

Released under the [MIT License](LICENSE). See [third-party notices](THIRD_PARTY_NOTICES.md) for included components.
