---
title: "MongoDB Data Modeling"
---

# General

- During initial modeling phase, prefer simplicity over performance
    - Performance can be implemented a lot easier, refactoring complexity
      is harder

# Initial Development

- Modeling is done in three phases
    1. Workload: Discovering how data will be used
        - Goal: Develop collection shape
        - What and how much data needs to be stored
        - What are important read/write operations
    2. Relationships: Identify relationships
        - Goal: Develop queries and indexes
        - Identify relationships
        - Which relationships should be embedded or referenced
    3. Patterns: Recognise and apply common patterns

# Many to Many

- Relationships can be referenced through embed or reference
- Duplicate may occur with embed relationships, which might be okay or even
  preferable
- Prefer embedding over referencing for simplicity, especially when there
  are only a small amount of related documents
- Embed on the side of the most queried
- Prefer referencing when related documents are not always needed with the most
  often queried documents
