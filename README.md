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
