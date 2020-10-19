# React Projects

A repository containing a variety of simple React projects. These projects use many different libraries and packages, such as: axios and redux.

## Projects

### Keeper App

Simple React app to keep all of your notes.

### ToDo List App

Simple React to do list app.

### Blog App

Simple blog app using React, axios and react-router.

## React Info

### Component Lifecycle

Class Component Lifecycle - Creation:

- constructor(props)
  - call super(props)
  - DO: set up state
  - DON'T: cause side-effects
- componentWillMount()
  - DO: update state, last-minute optimization
  - DON'T: cause side-effects
  - exists for historical reasons
- render()
  - prepare and structure JSX code
- Render Child Components
- componentDidMount()
  - DO: cause side-effects
  - DON'T: update state (triggers re-render)

Class Component Lifecycle - Update (triggered by Parent):

- componentWillReceiveProps(nextProps)
  - DO: sync state to props
  - DON'T: cause side-effects
- shouldComponentUpdate(nextProps, nextState)
  - DO: decide whether to continue or not
  - DON'T: cause side-effects
  - !may cancel updating process!
- componentWillUpdate(nextProps, nextState)
  - DO: sync state to props
  - DON'T: cause side-effects
- render()
  - prepare and structure JSX code
- Update Child Component Props
- componentDidUpdate()
  - DO: cause side-effects
  - DON'T: update state (triggers re-render)

## Redux - Immutable Update Patterns

### Updating Nested Objects

The key to updating nested data is that every level of nesting must be copied and updated appropriately. This is often a difficult concept for those learning Redux, and there are some specific problems that frequently occur when trying to update nested objects. These lead to accidental direct mutation, and should be avoided.

### Common Mistake #1: New variables that point to the same objects

Defining a new variable does not create a new actual object - it only creates another reference to the same object. An example of this error would be:

    function updateNestedState(state, action) {
        let nestedState = state.nestedState;
        // ERROR: this directly modifies the existing object reference - don't do this!
        nestedState.nestedField = action.data;

        return {
            ...state,
            nestedState
        };
    }

This function does correctly return a shallow copy of the top-level state object, but because the nestedState variable was still pointing at the existing object, the state was directly mutated.

### Common Mistake #2: Only making a shallow copy of one level

Another common version of this error looks like this:

    function updateNestedState(state, action) {
        // Problem: this only does a shallow copy!
        let newState = {...state};

        // ERROR: nestedState is still the same object!
        newState.nestedState.nestedField = action.data;

        return newState;
    }

Doing a shallow copy of the top level is not sufficient - the nestedState object should be copied as well.

### Correct Approach: Copying All Levels of Nested Data

Unfortunately, the process of correctly applying immutable updates to deeply nested state can easily become verbose and hard to read. Here's what an example of updating state.first.second[someId].fourth might look like:

    function updateVeryNestedField(state, action) {
        return {
            ...state,
            first : {
                ...state.first,
                second : {
                    ...state.first.second,
                    [action.someId] : {
                        ...state.first.second[action.someId],
                        fourth : action.someValue
                    }
                }
            }
        }
    }

Obviously, each layer of nesting makes this harder to read, and gives more chances to make mistakes. This is one of several reasons why you are encouraged to keep your state flattened, and compose reducers as much as possible.

### Inserting and Removing Items in Arrays

Normally, a Javascript array's contents are modified using mutative functions like push, unshift, and splice. Since we don't want to mutate state directly in reducers, those should normally be avoided. Because of that, you might see "insert" or "remove" behavior written like this:

    function insertItem(array, action) {
        return [
            ...array.slice(0, action.index),
            action.item,
            ...array.slice(action.index)
        ]
    }

    function removeItem(array, action) {
        return [
            ...array.slice(0, action.index),
            ...array.slice(action.index + 1)
        ];
    }

However, remember that the key is that the original in-memory reference is not modified. As long as we make a copy first, we can safely mutate the copy. Note that this is true for both arrays and objects, but nested values still must be updated using the same rules.

This means that we could also write the insert and remove functions like this:

    function insertItem(array, action) {
        let newArray = array.slice();
        newArray.splice(action.index, 0, action.item);
        return newArray;
    }

    function removeItem(array, action) {
        let newArray = array.slice();
        newArray.splice(action.index, 1);
        return newArray;
    }

The remove function could also be implemented as:

    function removeItem(array, action) {
        return array.filter( (item, index) => index !== action.index);
    }

### Updating an Item in an Array

Updating one item in an array can be accomplished by using Array.map, returning a new value for the item we want to update, and returning the existing values for all other items:

    function updateObjectInArray(array, action) {
        return array.map( (item, index) => {
            if(index !== action.index) {
                // This isn't the item we care about - keep it as-is
                return item;
            }

            // Otherwise, this is the one we want - return an updated value
            return {
                ...item,
                ...action.item
            };
        });
    }

### Immutable Update Utility Libraries

Because writing immutable update code can become tedious, there are a number of utility libraries that try to abstract out the process. These libraries vary in APIs and usage, but all try to provide a shorter and more succinct way of writing these updates. Some, like dot-prop-immutable, take string paths for commands:

    state = dotProp.set(state, `todos.${index}.complete`, true)

Others, like immutability-helper (a fork of the now-deprecated React Immutability Helpers addon), use nested values and helper functions:

    var collection = [1, 2, {a: [12, 17, 15]}];
    var newCollection = update(collection, {2: {a: {$splice: [[1, 1, 13, 14]]}}});

They can provide a useful alternative to writing manual immutable update logic.
