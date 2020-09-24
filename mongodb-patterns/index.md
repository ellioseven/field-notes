---
title: "MongoDB Patterns"
published: false
---

## Duplication

- It's a misconception to think that duplication is **always** bad
  - Duplication might be okay when information is static, eg: a list of actors on a movie
  - Duplication might not be okay with synchronisation, eg: movie gross revenue computed value across screenings.
    - Might be beneficial for an application to generate computed value on write

## Staleness

- Out of date data

## Attribute Pattern

- Groups a collection of similar fields into a key pair sub-document collection
- Problem:
  - It may be difficult to query and compare a selection of similar fields
  - Separate fields require multiple indexes
- Use case:
  - Common fields you would like to search across
  - You need an unpredictable data type (arbitrary storage)
- Benefits:
  - Easier to index (only a single index is required)
  - Field names don't have to be typed, arbitrary field storage
    - Can add new fields "on the fly"

## Extended Reference

- Prevents overhead of repetitive joins by introducing duplication
- Solution: Identify and move fields
- Benefits:
  - Faster reads
  - Reduce number of joins / lookups
- Trade-offs
  - May introduce large duplication, how will that impact your application?
