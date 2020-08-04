---
title: "MongoDB Data Modeling"
published: false
---

# General

- During initial modeling phase, prefer simplicity over performance
  - This might mean fewer collections where possible, favouring embedding
  - Performance optimisations can be implemented a lot easier later on, than removing complexity later on
  - Performance should be favoured for large complex or performance resource limited systems
- Favourable durability for data you can't loose

# Initial Development

- Modeling is done in three phases
  1. Describe Workload: Discovering how data will be used
    - What and how much data needs to be stored
    - Quantify and qualify operations
      - Describe: Actor, op. description, op. frequency, op. latency, data required, durability, operation type
      - What are most frequent operations
      - What are the most performance critical operations
      - You should be able to tell how many operations are run per unit of time and if they have performance requirements
    - Common observations include:
      - Predominately reads or writes? How can that be optimised?
      - Which queries are high or low latency?
      - Collection or index scans?
  2. Relationships: Identify relationships
    - Identify relationships
    - Which relationships should be embedded or referenced
  3. Patterns: Recognise and apply common patterns

# Relationships

- Relationships are links between entities
- Relationship types:
  - One to one: Customer has one profile
  - One to Many: Customer has many invoices
  - Many to Many: Many products appear or many invoices
- Cardinality may effect choice to embed or link
  - Identify minimum, maximum and average relationship size

## One to Many

- Prefer embed over reference for simplicity, or when there is a small number of referenced documents
- Prefer reference when relationships are not always needed with the most often queried documents
- Embed or reference can be done on the "one" side, or the "many" side
  - Embed usually on the most queried side, usually on the "one" side
      - Multi-key indexes can be used for embedded queries
      - Embeds on the "many" side should usually be static
  - Reference usually on the "many" side
    - Allows for large document or high cardinality relationships
    - A reference on "one" side can be useful for frequent references where an additional disk read isn't required, saving queries, however data duplication is and synchronisation is required

## Many to Many

-
