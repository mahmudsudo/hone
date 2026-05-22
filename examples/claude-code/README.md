# Hone Protocol — Claude Code Integration

Claude Code reads `CLAUDE.md` from your project root automatically on every session.

## Setup
```bash
npx hone init --target claude-code
```
This creates or appends to `CLAUDE.md` in your project root.

## Manual Setup
Copy the contents of `hone.md` into your `CLAUDE.md`.

---

## How it looks in Claude Code

Every code response from Claude Code will end with:

```
## 🔍 Hone Digest
What just happened: The function uses a sliding window algorithm...
Key decision: A Map was chosen over a plain object for O(1) lookups...
Watch out for: This assumes the input array is non-empty...

## 🎯 Hone Check
What would happen to the window size if all characters in the string are unique?

> Answer with `hone: your answer`
```

## Tips for Claude Code users
- CLAUDE.md is read at the start of every session automatically
- You can add domain packs: `hone add react` updates your CLAUDE.md
- Works across all Claude Code sub-agents in the same project

---

*Hone — AI writes the code. You understand it.*