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

# Architecture Characteristics

- Architecture Characteristic: Implications of business requirement design
- An architecture characteristic meets three criteria:
  - Specifies a nondomain design consideration: Describes HOW a requirement is implemented and WHY choices were made (explicit)
  - Influences some structural aspect of the design: Concern of a requirement (eg: security) needs special structural design (eg: isolation by a separate module, service, etc.) (implicit)
  - Is critical or important to application success: Only a handful of characteristics can be successfully elevated, otherwise architecture becomes extremely complex and fails
- Split between implicit and explicit:
  - Implicit: Must be "discovered" during requirement analysis
  - Explicit: Are defined in requirements
- Characteristic categorisation:
  - Operational:
    - Availability: How long the system will need to be available
    - Continuity: Disaster recovery capability.
    - Performance:
    - Recoverability: How long or difficult will a recovery be after a disaster
    - Reliability: How resilient is the application? Does it need to be fail-safe? What is the impact of a failure?
    - Scalability: Ability to respond to request frequency
  - Structural:
    - Configurability: Ability for users to change configuration
    - Extensibility: How important new "pieces" need to be "plugged in"
    - Installability: How easy installation is on all platforms
    - Leverageability: How easy re-use is among multiple products
    - Maintainability: How easy changes can be applied to a system
    - Portability: Does the application need to run on different platforms?
    - Supportability: What level of technical support (logging, debugging, etc.) is required
    - Upgradeability: How easy a transition is to/from a next/previous version for clients and servers
  - Cross-cutting:
    - Accessibility: Can the application be accessed by all users (disability)
    - Archivability: Will the data need to be archived or deleted after a period of time?
    - Authentication: Are the users who they say they are?
    - Authorisation: Can the user access this certain function?
    - Usability: Level of training required to work with the system
- Architecture characteristics require a balance, improving one (eg: security) will effect another (eg: performance), leading to trade-offs
- Never shoot for the best architecture, but rather the least worst architecture

# Identifying Architectural Characteristics

- Identifying dominate architectural characteristics is the first step to creating a new architecture or validating an existing one
  - Discover what is truely important from a business domain standpoint
- Discovered from domain concerns, requirements and domain knowledge
  - Understand key domain goals and situation to develop the most important characteristics
- Domain stakeholders and architects speak a different language, a translation is often required:
  - Mergers and acquisitions: Interoperability, scalability, adaptability, extensibility
  - Time to market: Agility, testability, deployability
  - User satisfaction: Performance, availability, fault tolerance, testability, deployability, agility, security
  - Competitive advantage: Agility, testability, deployability, scalability, availability, fault tolerance
  - Time and budget: Simplicity, feasibility
- A domain concern often translates to multiple characteristics, don't fall into the trap of neglecting other important characteristics (eg: time to market includes agility, but also testing and deployability)
- Look for characteristics that come from explicit requirements, such as expected number of users and scaling requirements
- Domain knowledge can help discover implicit characteristics, eg: A class registration system needs to be designed, will students register evenly over the deadline or register last minute? How does that effect characteristics like scalability
- Steps:
  1. Consider each requirement carefully, separate __explicit__ characteristics
  2. Consider each requirement carefully, separate __implicit__ characteristics

## Example

- Sandwich shop, makes and delivers food online
  - Requirements:
    - Currently handles thousands of users
    - Potentially millions of users in the future
    - Use a mapping service for pick up directions
    - Provide a strong mobile experience
  - Explicit requirements:
    - Scalability: Being able to scale from thousands of users to milllions of users
  - Implicit requirements:
    - Elasticity: Orders will be made primarly around meal times, being able to respond to high/low volumes in bursts
    - Reliability: What happens if the mapping service goes down?
    - Performance: Must be responsive for mobile users

## Measuring & Governing Architecture Characteristics