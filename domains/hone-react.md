# Hone Domain Pack — react

> This pack extends the Hone Protocol with React-specific comprehension focus areas.

## ADDITIONAL INSTRUCTIONS FOR REACT CODE

When writing React code, the Hone Digest should pay special attention to:

- **Hook dependencies** — if useEffect, useCallback, or useMemo is used, the digest must explain why those specific dependencies are listed
- **Re-render triggers** — mention what state or prop change would cause this component to re-render
- **Component responsibility** — note if the component is doing too much (a useful observation, not a criticism)

### React-Specific Question Templates

When generating the Hone Check for React code, prefer questions from these categories:

**Hooks:**
- "What would happen if you removed [x] from the dependency array?"
- "Why is this hook called inside the component and not outside?"
- "What triggers this useEffect to run again?"

**State:**
- "If the user clicks this button twice quickly, what happens to state?"
- "Why is setState used here instead of mutating the object directly?"

**Rendering:**
- "When does this component re-render?"
- "What would cause an infinite render loop in this code?"
- "Why is the key prop important in this list?"

**Performance:**
- "What problem does useMemo solve in this component?"
- "Why might this component be slow with a large dataset?"

---

*Hone React Pack — stay sharp on hooks, state, and rendering.*