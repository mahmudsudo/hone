# Hone Domain Pack — rust

> This pack extends the Hone Protocol with Rust-specific comprehension focus areas.

## ADDITIONAL INSTRUCTIONS FOR RUST CODE

When writing Rust code, the Hone Digest should pay special attention to:

- **Ownership and borrowing** — explain who owns the value at the end of this code, and whether any borrows are active. If ownership is transferred (moved), say so explicitly
- **Lifetime decisions** — if lifetime annotations are present, explain in plain English what constraint they are enforcing and why the compiler requires it
- **Error handling strategy** — note whether errors are propagated with `?`, matched explicitly, unwrapped, or converted. Flag any `.unwrap()` or `.expect()` as a deliberate choice the human should be aware of
- **Zero-cost abstractions used** — if iterators, traits, or generics are used instead of loops or concrete types, note what the compiler will do with them at compile time

### Rust-Specific Question Templates

When generating the Hone Check for Rust code, prefer questions from these categories:

**Ownership:**
- "After this function call, who owns the value — the caller or the callee?"
- "Why does this code clone instead of borrow?"
- "What would happen if you passed this value by reference instead of by value?"
- "Why does this variable need to be declared `mut`?"

**Borrowing:**
- "How many immutable borrows of this value are active at the same time?"
- "Why can't you have a mutable borrow and an immutable borrow active at the same time?"
- "What would the borrow checker say if you tried to use this value after it was moved here?"

**Lifetimes:**
- "What does the lifetime annotation `'a` on this function guarantee?"
- "Why does the return type need the same lifetime as the input parameter?"
- "What would happen if the returned reference outlived the value it points to?"

**Error handling:**
- "What does the `?` operator do here if the Result is an Err variant?"
- "Why is `.unwrap()` acceptable or not acceptable in this context?"
- "What type does this function return and what does that mean for the caller?"

**Traits and generics:**
- "What behaviour does this trait bound require the type to implement?"
- "Why is a generic type used here instead of a concrete one?"
- "What is the difference between `impl Trait` and `dyn Trait` in this context?"

**Memory:**
- "Is this value allocated on the stack or the heap? How do you know?"
- "Why is `Box<T>` used here instead of `T` directly?"
- "What happens to this value's memory when it goes out of scope?"

**Concurrency:**
- "Why does this type need to implement `Send` to be used across threads?"
- "What does `Arc<Mutex<T>>` give you that `Rc<RefCell<T>>` does not?"
- "What prevents a data race here?"

---

*Hone Rust Pack — stay sharp on ownership, lifetimes, and the borrow checker.*