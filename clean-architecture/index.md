---
title: "Clean Architecture"
---

- Goal: Minimise human resources to build and maintain the system
- Good architecture makes the system easy to understand, easy to develop, easy to maintain, and easy to deploy
- Measure: Effort required to meet customer needs
- Signs of bad architecture:
  - Simple things are hard
  - Takes more and more time for "simple" tasks
- Separate details from business logic
- Leave as many technical options open for as long as possible
  - Maximise the number of decisions not made
- Good architecture supports:
  - Use case and operation of the system
  - Maintenance of the system
  - Development of the system
  - Deployment of the system
- SDLC balances on behaviour and architecture, never focus on just behaviour as changes will become ever increasing complex and difficult
- Behaviour is usually "Not important but urgent", architecture almost always proceeds behaviour as it's "Important and Urgent" or "Important not urgent"
  - It's up to the architect to ensure important tasks are prioritised first
- Race conditions and concurrent updates all stem from mutability
- Push as much processing as possible into immutable components, separate and drive mutability code as much as you can
- Event sourcing
  - A way of alleviating mutability
  - Values are calculated by transactions instead of a mutable value
  - Similar to how Redux or the block chain works

## Cohesion

- What classes belong to what components
- Cohesion will be determined by re-usability, maintenance and deployment
  - Re-usability: Classes within a component are often used together
  - Maintenance: Classes within a component are often changed together
  - Deployment: Classes within a component are often deployed together

### Reuse/Release Equivalence Principle

- What: Classes that are grouped/re-used together should be released together
- Why: Ease the process of providing compatible and versioned releases so that dependents are free to choose to upgrade or not
- When: When a module is shared, group for re-use

#### Notes

- Inclusion principle
- When a dependency release is made, it must produce the appropriate notifications and release documentation so that users can make informed decisions about when and whether to integrate the new release

### Common Closure Principle

- What: Classes that are typically changed together at the same time should be grouped, classes that change at different times at different reasons should be separated
- Why: Makes it easier to release and deploy components by reducing the amount of parts that need to change
- When: Releases or deployment's are usually segregated across multiple components, group for maintenance

#### Notes

- Inclusion principle
- Similar to "Single Responsibility Principle" in that classes that have only one reason to change are grouped

### Common Reuse Principle

- What: Classes that aren't strictly coupled should not be grouped into the same component
- Why: Reduces the amount of unnecessary releases/deployments
- When: Releases/deployments don't consist of even change segregation within the component, split for unnecessary releases

#### Notes

- [Cohesion Tension](cohesion-tension.png)
- Exclusion principle
- Don't depend on things you don't need
- Similar to the "Interface Segregation Principle"

## Component Coupling

- Goal: Create stability between components
  - Prevent frequent changes to a component to affect other stable components
- These are aspects that become more and more apparent as the project lifecycle goes on

### Acyclic Dependency Principle

- What: Allow no cycles in component dependency
- Why: Acyclic dependencies make it difficult to isolate a component and may cause many unrelated components to become surprising coupled
- When: Always

#### Notes

- Can be alleviated with dependency inversion
- Can be alleviated with adapter pattern

### Stable Dependency Principle

- What: Depend in the direction of stability
  - Any component that is expected to change should not be depended on by a component that is difficult to change
- Why: By having a stable component that relies on a flexible component, that flexible component becomes difficult to change (not flexible)
- When: Always, particularly when a component has multiple dependants

## Business Rules

- Business rules should be highly independent and highly re-usable, the heart and most elevated point of a system
- Business rules comprise of "critical business rules" and "critical business data", which can be grouped into a single "entity".
- An entity is not concerned with lower level details such as databases, UI, frameworks, etc. It can serve business into any system
- Use case: How entities interact to perform application specific rules
  - Doesn't describe lower details such as UI, database, etc. Providers an input and an output.
  - Use cases should have zero or minimal dependencies, not even dependencies of related entities
  - How data gets in an out is irrelevant
  - eg: Gather contact information for a new loan
    - Entities: "Customer", "Loan Estimate", "Denial"
    - Input: Name, address, birthdate, etc.
    - Output: Name, address, birthdate, etc. plus credit score
    - Course:
      1. Accept and validate loan
      2. Validate details
      3. Get credit score
      4. If credit score < 500, activate "Denial"
      5. Else, create "Customer", activate "Loan Estimation"

## Screaming Architecture

- Don't let frameworks take over the architecture
- Business rules and use cases should be tested without frameworks

## The Clean Architecture

[Clean Architecture](clean-architecture.png)

- Clean architecture allows details such as database or framework to be replaced without massive headaches
- Architecture should be split into layers that separates abstraction, linked by the dependency rule
- Architecture shouldn't depend on frameworks of libraries
  - Architecture should be UI independent
  - Architecture should be database independent
- Business rules and use cases should be tested without details (ui, database, etc.)
- Source code dependencies must point only inward, toward higher-level policies
  - eg: Business rules don't import use cases, use cases don't import UI
  - When passing data to an inner circle, it must be generic, without any implementation detail, such as SQL rows, etc.
- Interface Adapters: Converts data from use cases and entities to a format compatible for details such as database or the UI
  - Sits between low level details such as database and high level such as use cases and business logic
  - Presenters, views and controllers all belong in interface adapters

## Presenters & Humble Objects

- Separate logic by testable and non-testable, allowing core logic to be elevated and tested
  - Separate logic that is hard to test into a "humble object" and try to keep it small and simple, eg: UI
  - Separate the rest into a "presenter" which can format data which is compatible for the presenter
- A great approach for logic that is difficult to test, such as UI
- Database Gateways: An abstraction/interface that links the database to the inner circle, it contains all the logic needed and passed into the higher levels such as use cases and business logic
  - Inner circles (use cases, business logic, etc.) should not contain lower levels details such as SQL

## Partial Boundaries

- What: Implement a partial boundary, by using "Skip the Last Step", "Strategy" or "Facade"
- Why:  Maintaining boundaries between architecture layers is a lot of work, and it may not be needed, but this may change in the future
- When: You aren't sure if the value of maintaining strong architecture is needed or worth the cost

### Notes

- Approaches:
  - Skip the Last Step: Do all the work to implement architecture layers, but keep them in the same component
  - Strategy Pattern: @todo
  - Facade Pattern: @todo
- Reduces the cost of maintaining versions or release management
- Can prevent fragmentation that is not needed

## Layers and Boundaries

- A layer or boundary is to create an abstraction between dependencies, they can be found in many areas between components
- Developing and maintaining a layer or boundary is expensive
- If boundaries are ignored, the cost is even greater
- Know how to visualise when a boundary may or may not be needed, does this particular component need to change in the future? Is a partial or full implementation of abstraction needed or likely to be needed?

## The Main Component
