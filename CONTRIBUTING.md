# Contributing to Hone

Thanks for wanting to contribute. Hone is deliberately simple — keep it that way.

---

## The easiest contribution: a new domain pack

A domain pack is just a markdown file. No code required.

**To create one:**

1. Copy an existing domain pack (e.g. `domains/hone-react.md`)
2. Rename it to `hone-[yourdomain].md`
3. Update the focus areas and question templates
4. Add it to the `AVAILABLE_DOMAINS` list in `skill/domains.js`
5. Submit a PR

Good domains to add: `rust`, `go`, `typescript`, `docker`, `graphql`, `testing`, `security`

---

## Improving question templates

The quality of Hone is directly tied to the quality of the questions.

A good Hone question:
- Tests understanding, not recall
- Has a single clear correct answer
- Is specific to the code just written, not generic trivia
- Scales with complexity (harder code = harder question)
- Can be answered in 1-3 sentences

A bad Hone question:
- "What is a closure?" (too generic)
- "Is this good code?" (no clear answer)
- "What does line 7 do?" (too narrow)

---

## Code contributions

For anything beyond markdown files:
1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Keep changes minimal and focused
4. Submit a PR with a clear description

---

## Reporting issues

Open a GitHub issue. Include:
- What AI tool you're using (Cursor, Claude Code, etc.)
- What the AI did instead of following the protocol
- The exact prompt/response if possible

---

*Keep it simple. Keep it useful. Keep people sharp.*