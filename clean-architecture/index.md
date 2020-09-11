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

## Cohesion

- What classes belong to what components
- Classes are the bricks, components are the rooms
- Cohesion will change as focus shifts from developability to re-useability

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

### Acyclic Dependencies

- What: Allow no cycles in component dependency
- Why: Acyclic dependencies make it difficult to isolate a component and may cause many unrelated components to become surprising coupled
- When: Always

#### Notes

- Can be alleviated with dependency inversion
- Can be alleviated with adapter pattern
