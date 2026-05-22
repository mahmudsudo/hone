# ⚡ Hone

> **AI writes the code. You understand it.**

Hone is an open-source skill preservation layer for developers using AI coding tools. It wraps any AI engine with a comprehension protocol that keeps your coding instincts sharp — even as AI does more of the heavy lifting.

---

## The Problem

AI coding tools are extraordinary. They also make it dangerously easy to accept code you don't fully understand. Over time, you stop building mental models. You start losing intuition. Your skills drift.

Hone fixes that.

---

## How It Works

Every time your AI writes code, Hone adds two things:

**1. A Digest** — A plain-English summary of what the code does, what decision was made, and what to watch out for.

**2. A Comprehension Check** — One focused question that tests whether you actually understood what was just written.

That's it. One loop. Keeps you engaged.

```
## 🔍 Hone Digest

**What just happened:** The function uses a sliding window to track the longest
substring without repeating characters, updating the window boundaries as it
iterates through the string.

**Key decision:** A Map was used instead of a plain object for character tracking
because it gives O(1) lookups and is slightly safer with unusual key names.

**Watch out for:** This assumes the input string is non-empty — an empty string
will return 0 correctly, but passing null or undefined will throw.

## 🎯 Hone Check

What would happen to the result if the string contains only one unique character
repeated 100 times?

> Answer with `hone: your answer`
```

---

## Quick Start

**Option 1 — Drop the file (zero setup)**
```bash
# Copy hone.md into your project root
# Your AI will read it automatically (Cursor, Claude Code, etc.)
cp hone.md /your/project/hone.md
```

**Option 2 — Use the CLI**
```bash
# Install and init for your AI tool
npx hone init                        # generic hone.md
npx hone init --target cursor        # .cursorrules
npx hone init --target claude-code   # CLAUDE.md
npx hone init --target vscode        # .github/copilot-instructions.md
```

**Option 3 — Add a domain pack**
```bash
npx hone init --target cursor --domain react
# or add one later
npx hone add sql
```

---

## Domain Packs

Domain packs extend Hone with language/framework-specific question templates.

| Pack | Focus |
|------|-------|
| `react` | Hooks, state, rendering, performance |
| `sql` | Joins, indexes, aggregation, query optimization |
| `python` | Idioms, mutability, async, OOP |
| `node` | Event loop, streams, APIs, middleware |
| `devops` | Docker, CI/CD, Kubernetes, IaC |

```bash
npx hone add react
npx hone add sql
npx hone domains   # list all available packs
```

---

## Comprehension History

Hone logs your answers locally in `.hone/history.json` (gitignored by default).

```bash
npx hone history          # last 10 sessions
npx hone history --last 50
```

The history view shows:
- Which answers were correct / incorrect
- Your weak spots by topic
- Session timestamps

---

## Supported AI Tools

| Tool | How Hone loads |
|------|---------------|
| **Cursor** | `.cursorrules` |
| **Claude Code** | `CLAUDE.md` |
| **GitHub Copilot** | `.github/copilot-instructions.md` |
| **Any AI (raw)** | `hone.md` — paste into system prompt |

---

## Controls

Use these inline during any AI session:

| Command | Effect |
|---------|--------|
| `hone: [your answer]` | Submit your comprehension answer |
| `hone: skip` | Skip digest + question for this response |
| `hone: off` | Disable Hone for the rest of the session |
| `hone: on` | Re-enable Hone |

---

## Project Structure

```
hone/
├── hone.md              ← core drop-in file (start here)
├── package.json
├── skill/
│   ├── cli.js           ← npx hone entry point
│   ├── index.js         ← init logic
│   ├── logger.js        ← local history tracking
│   └── domains.js       ← domain pack manager
├── domains/
│   ├── hone-react.md
│   ├── hone-sql.md
│   └── hone-python.md
├── examples/
│   ├── cursor/
│   ├── claude-code/
│   └── vscode/
└── README.md
```

---

## Contributing

Hone is open source and built for the community.

**Ways to contribute:**
- Add new domain packs (`hone-rust.md`, `hone-go.md`, etc.)
- Improve question templates in existing domain packs
- Build IDE plugins that log comprehension answers automatically
- Add support for new AI tools

See [CONTRIBUTING.md](CONTRIBUTING.md) to get started.

---

## Philosophy

Hone doesn't slow you down. It doesn't gatekeep AI. It doesn't make you write code the hard way.

It just makes sure that as AI gets more powerful, you stay sharp too.

*AI writes the code. You understand it.*

---

## License

MIT — free to use, fork, and extend.