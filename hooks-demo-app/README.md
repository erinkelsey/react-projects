# React Hooks Demo App

A simple app to show how to use React Hooks like useState(), useCallback(), useRef(), useReducer(), useContext(), useMemo() and useEffect().

## Setup

### Firebase

The backend database is Firebase, so you will need to set up a new project.

Once the project is setup, go to the Realtime Database page, and click Create Database. Start the database in TEST MODE.

The rules should be similar to this:

    {
      "rules": {
        ".read": true,
        ".write": true,
        "ingredients": {
          ".indexOn": ["title"]
        }
      }
    }

Take note of the database endpoint, you will need it for the .env file.

### Environment Variables

Create a .env file in the base of the project, with the following variables:

    REACT_APP_FIREBASE_DB_URL=https://[your-project-name].firebaseio.com/

## Install Dependencies

    $ npm install

## Run

    $ npm start
