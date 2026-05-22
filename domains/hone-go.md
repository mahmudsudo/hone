# Hone Domain Pack — go

> This pack extends the Hone Protocol with Go-specific comprehension focus areas.

## ADDITIONAL INSTRUCTIONS FOR GO CODE

When writing Go code, the Hone Digest should pay special attention to:

- **Goroutine lifecycle** — if a goroutine is spawned, explain what controls its lifetime and what happens if the caller returns before it finishes. Flag any goroutine that has no clear exit path
- **Channel direction and blocking** — note whether a channel send or receive can block, who unblocks it, and what happens if the other side is never ready
- **Error handling** — Go errors are explicit and returned as values. Note whether errors are checked, wrapped with context (`fmt.Errorf("...: %w", err)`), or silently ignored with `_`. Flag ignored errors
- **Interface satisfaction** — if an interface is used, note what concrete type satisfies it here and whether the interface is the right abstraction for this case
- **Value vs pointer receivers** — if methods are defined, explain why a value or pointer receiver was chosen and what the difference means for mutability and copying

### Go-Specific Question Templates

When generating the Hone Check for Go code, prefer questions from these categories:

**Goroutines and concurrency:**
- "What stops this goroutine from leaking if the parent function returns early?"
- "What happens if this channel is never read from?"
- "Why is a WaitGroup used here instead of just waiting on a channel?"
- "What is the difference between a buffered and unbuffered channel in this context?"
- "Could this code have a race condition? How would you detect it?"

**Channels:**
- "Who is responsible for closing this channel, and why does it matter?"
- "What happens if you send to a closed channel?"
- "Why is a select statement used here instead of a direct channel receive?"
- "What would happen if the channel buffer fills up?"

**Error handling:**
- "What information is lost if this error is returned without wrapping?"
- "How would the caller distinguish between the two different errors this function can return?"
- "Why should you use `errors.Is` instead of direct equality comparison here?"

**Interfaces:**
- "What methods does a type need to implement to satisfy this interface?"
- "Why is an interface used as the parameter type here instead of the concrete struct?"
- "What is the difference between a nil interface and an interface holding a nil pointer?"

**Memory and values:**
- "Why is a pointer passed here instead of a value?"
- "What happens to a map or slice when you pass it to a function — is it a copy?"
- "Why does modifying a slice inside a function not always affect the original?"

**Structs and methods:**
- "Why does this method use a pointer receiver instead of a value receiver?"
- "What happens if you call a pointer method on a nil pointer?"
- "When would you embed a struct instead of composing with a named field?"

**Go idioms:**
- "What does the `defer` call here guarantee, even if the function panics?"
- "Why is `init()` used here and what are the risks of relying on it?"
- "What is the zero value of this type and is it useful?"

---

*Hone Go Pack — stay sharp on goroutines, channels, errors, and Go idioms.*