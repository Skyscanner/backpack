# Deprecated API

## What is it?

Deprecated API is a part of the library that will be **REMOVED** from the Public API (a set of functions, components, variables, types, public properties and methods exposed to consumers) in a following major version.

The main purpose of the Deprecated API is to give consumers enough time to remove their usage of the deprecated API before it's removed from the library.

## How to add/delete?

* You **MUST** always mark any feature that will be removed as deprecated before its removal (e.g., removing a prop of a component, removing a component, etc.).
* Deprecated props and arguments **MUST** always be optional
* Deprecated API **MUST** follow the naming convention below
* Deprecated API will be deleted by the owners of backpack repository when preparing for a major release
* Deprecating API **MUST** never cause any breaking changes for the consumer
* There **SHOULD** always be a minimum of 3 months between marking and releasing a feature as deprecated and removing it from the Public API

## How to use?
* You **SHOULD** aim to move away from Deprecated API as soon as possible

## Naming Convention

* We use `@deprecated - deprecation message` JSDoc or TSDoc comments to mark functions, components, or properties as deprecated
    * **Component**:
        ```js
        /**
        * @deprecated use ComponentX instead
        */
        const ComponentName = (props) => { ... }
        ```
    * **Props**:
        ```js
        type ComponentProps = {
            name: string;
            /**
            * @deprecated label prop is deprecated
            */
            label?: string;
        }
        ```
