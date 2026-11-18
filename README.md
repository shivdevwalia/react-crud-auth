# React Context and Route Guards

A learning project using React Context and React Router to model sign-in state and show user-specific JSONPlaceholder resources.

The interface matches a username and email against public sample users, persists the selected user in localStorage, and uses a client-side route guard. This is a simulation for learning state and navigation; it does not provide server authentication or authorization.

## Explore the implementation

- [Auth context](src/AuthContextprovider.jsx): sign-in state, public sample-user lookup, and logout.
- [Route guard](src/PrivateRoute.jsx): redirect unauthenticated interface state.
- [Components](src/components): albums, photos, comments, posts, and todos.

## Run locally

```sh
npm ci
npm run dev
```

Requires a compatible Node.js runtime and internet access to JSONPlaceholder. `npm run build` builds the Vite frontend. No automated test suite is included.
