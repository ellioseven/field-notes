---
title: "SOLID Principles"
---
- What: How to arrange software entities into logical groupings and how they should be connected
- Why: Create software that tolerates change, easy to understand, can be shared
- When: You predict frequent changes or use

## Notes

- Each principle can be implemented by many different types of patterns, the aim here is to learn what the principles are, why they are used and when to use them
- Over-use of any principle can lead to over fragmentation, making it difficult to maintain. Know when and how to balance these principles, typically only when you need them
- The term module refers to any kind of software entity grouping (methods, functions, data, etc.), typically within in a single file

## Single Responsibility Principle

- What: A module should have only a single reason to change
- Why: Breaking problems up makes them easier to manage and understand
- When: When you need to create simplicity or reduce volatility

## Open Closed Principle

- What: Open for extension, closed for modification. Changes should be applied by adding new code, instead of changing existing code
- Why: Makes it easier to extend a module, minimises impact on dependants when module components need to change
- When: When an module might need to be extended now or in the future, when module components are expected to change


## Liskov Substitution Principle

- What: A class should not contain a property that doesn't exist on any of it's parents classes
- Why: It's a strong sign that the wrong type of relationship has been used and can lead to incompatible subtyping, pollutes system with "exceptions"
- When: Almost always, When strong relationships are required and cannot accept incompatibilities

### Notes

- Best practice for inheritance
- A class subtype should be replaceable by descendant subtypes
- Phrases:
  - "Whatever the parent can do, the children can do"
  - "Broken Liskov: Animal cans speak, snail is an animal, snails can't speak"
- Can be alleviated by favouring composition over inheritance
  - "Has a" instead of "is a"

## Interface Segregation Principle

- What: No client should be forced to depend on methods it doesn't use
- Why: Creates unnecessary coupling in a system
- When: Particularly necessary when the cost of needless coupling is high

### Notes

- "A may depend on B, B may depend on C, C implements features that aren't relevant to B, therefore A depends on irrelevant coupling in C"
- Can be alleviated by favouring composition over inheritance
  - "Has a" instead of "is a"

## Dependency Inversion:

- What: High level modules should be unaffected by changes in low-level modules, by preferring abstraction of concrete components
- Why: Increases stability, compatibility and re-use of high level business logic
- When: Low level modules are volatile or need to be compatible

### Bites

- Low level modules usually provide utility functions
- Example: An application needs to accept payments between a variety of providers, a "payment processor" abstraction can be consumed that implements providers such as Stripe, PayPal, etc. (where providers can be easily changed)
- Stable abstraction over volatile concretion
- Solutions
  - Adapter pattern
  - Polymorphism and dependency injection

## References

- https://stackify.com/solid-design-principles/
- https://www.youtube.com/watch?v=UQqY3_6Epbg&list=PLZlA0Gpn_vH9kocFX7R7BAe_CvvOCO_p9
- https://blog.usejournal.com/how-to-apply-solid-principles-in-react-applications-6c964091a982
