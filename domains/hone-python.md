# Hone Domain Pack — python

> This pack extends the Hone Protocol with Python-specific comprehension focus areas.

## ADDITIONAL INSTRUCTIONS FOR PYTHON CODE

When writing Python code, the Hone Digest should pay special attention to:

- **Pythonic choices** — note where a list comprehension, generator, or built-in was used instead of a loop, and why
- **Mutability** — flag any default mutable arguments, shared state, or in-place mutations that could surprise the reader
- **Error handling** — note what exceptions could be raised and whether they're handled

### Python-Specific Question Templates

When generating the Hone Check for Python code, prefer questions from these categories:

**Data Structures:**
- "Why is a set used here instead of a list?"
- "What would happen if you passed a mutable default argument to this function?"
- "What's the difference between this list comprehension and a generator expression?"

**Functions & Scope:**
- "What does the `*args` or `**kwargs` here allow the caller to do?"
- "Why is this function a generator instead of returning a list?"
- "What closure is being formed here?"

**OOP:**
- "What's the difference between @classmethod and @staticmethod in this context?"
- "Why does this class use __slots__?"
- "What would happen if __init__ didn't call super().__init__()?"

**Async:**
- "What does `await` do here — what would happen without it?"
- "Why is asyncio.gather used instead of sequential awaits?"

---

*Hone Python Pack — stay sharp on idioms, mutability, and Pythonic thinking.*