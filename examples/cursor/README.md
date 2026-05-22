# Hone Protocol — Cursor Integration

To use Hone with Cursor, you have two options:

## Option A — Automatic (Recommended)
```bash
npx hone init --target cursor
```
This creates a `.cursorrules` file in your project root with the Hone Protocol pre-loaded.

## Option B — Manual
Copy the contents of `hone.md` into your `.cursorrules` file.

---

## How it looks in Cursor

Once active, every AI response in Cursor will end with:

```
## 🔍 Hone Digest
What just happened: ...
Key decision: ...
Watch out for: ...

## 🎯 Hone Check
[Question]
> Answer with `hone: your answer`
```

## Tips for Cursor users
- The Hone Protocol works in both Chat and Composer modes
- Use `hone: skip` in your prompt if you just want the code fast without the digest
- Use `hone: off` at the start of a session if you're in flow and don't want interruptions

---

*Hone — AI writes the code. You understand it.*