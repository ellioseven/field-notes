---
title: "Clean Architecture"
---

- Goal: Minimise human resources to build and maintain the system
- Measure: Effort required to meet customer needs
- Signs of bad architecture:
  - Simple things are hard
  - Takes more and more time for "simple" tasks
- SDLC balances on behaviour and architecture, never focus on just behaviour as changes will become ever increasing complex and difficult
- Behaviour is usually "Not important but urgent", architecture almost always proceeds behaviour as it's "Important and Urgent" or "Important not urgent"
  - It's up to the architect to ensure important tasks are prioritised first
- Race conditions and concurrent updates all stem from mutability
- Push as much processing as possible into immutable components, separate and drive mutability code as much as you can
- Event sourcing
  - A way of alleviating mutability
  - Values are calculated by transactions instead of a mutable value
  - Similar to how Redux or the block chain works
