# Hone Domain Pack — sql

> This pack extends the Hone Protocol with SQL-specific comprehension focus areas.

## ADDITIONAL INSTRUCTIONS FOR SQL CODE

When writing SQL queries, the Hone Digest should pay special attention to:

- **Join type chosen** — explain why INNER, LEFT, RIGHT, or FULL join was used and what would happen with a different type
- **Index awareness** — note if the query would benefit from or rely on an index
- **Performance consideration** — flag any potential N+1 patterns, full table scans, or missing WHERE clauses

### SQL-Specific Question Templates

When generating the Hone Check for SQL code, prefer questions from these categories:

**Joins:**
- "What rows would be returned if there's no match in the right table?"
- "How would this result change if you used an INNER JOIN instead of LEFT JOIN?"
- "Why is this join condition written this way?"

**Filtering:**
- "What happens to query performance if this table has 10 million rows?"
- "Why is filtering done in WHERE instead of HAVING here (or vice versa)?"

**Aggregation:**
- "What does GROUP BY do to duplicate values in this query?"
- "What would happen if you removed the HAVING clause?"
- "Why is COUNT(*) used instead of COUNT(column)?"

**Indexes:**
- "Which column in this query would benefit most from an index?"
- "Would this query use an index on [column]? Why or why not?"

---

*Hone SQL Pack — stay sharp on joins, filters, and query thinking.*