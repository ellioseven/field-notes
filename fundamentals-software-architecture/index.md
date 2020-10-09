---
title: "Fundamentals of Software Architecture"
---

# Introduction

- Laws of Software Architecture
  - Everything in software architecture is a trade-off
  - Why is more important than how
- Fitness Functions:
  What: A way measure and ensure architectural characteristics are met
  Why: Protect architectural characteristics over time
  When: When an important characteristic has been identified or needs to be enforced
  How: Identify an important characteristic of the architecture and develop a function that asserts that characteristic
  Example: Identify page load time as an importance characteristic of the architecture, allowing the system to change without degrading performance. The architecture builds a fitness function as a test that measures page load time for each page and then runs the test as part of the continuous integration for the project

# Architectural Thinking

- Architecture VS Design
  - Design infers that architecture is a siloed effort from the architecture and then handed to the development team
  - Architecture requires a collaborative effort where leadership and mentoring provides a feedback loop through the entire SDLC
- Wide breadth of technical knowledge at a certain depth
  - A developer will gain particular knowledge in a certain area, they will become very good at solving particular problems, an architect will gain knowledge in diverse areas but with less technical depth, they will be very good at being aware of multiple solutions for a particular problem
   - Avoid trying to maintain too much depth in too many areas
   - Avoid thinking that stale/outdated knowledge is cutting edge
- Understanding trade-offs between solutions and technologies
  - Ask, what are the advantages and disadvantages of a solution
- How business drivers correlate translate to architecture characteristics
- Balance hands on development with architecture
  - Don't become the bottleneck by taking ownership of critical code
  - __Develop future services that are a few iterations away__
  - Develop production quality POCs
  - Tackle low risk/priority technical debt or architecture stories
  - Bug fixes
  - Automation tasks to easy repetitive tasks
  - Code reviews

# Modularity

- Huh?
