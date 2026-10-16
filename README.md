# React Auth0 Example

A minimal React app that signs in with [Auth0](https://auth0.com) and gets an access token for an API. It is the smallest working use of the `@auth0/auth0-react` SDK.

## What it shows

Auth0 runs the sign-in page, so the app never handles a password. The SDK uses the authorization code flow with PKCE:

1. `Auth0Provider` wraps the app with the tenant domain, the client ID, and the API audience.
2. `loginWithRedirect` sends the user to the Auth0 sign-in page. Auth0 sends the user back to the app.
3. `useAuth0` gives every component the state: `isLoading`, `isAuthenticated`, `user`, and `error`.
4. `getAccessTokenSilently` returns an access token for the audience. The SDK renews it in the background.

The app logs the access token to the browser console. You can decode it at [jwt.io](https://jwt.io) to see its claims.

## Run it

1. Install [mise](https://mise.jdx.dev/getting-started.html).
2. In the Auth0 dashboard, create a **Single Page Application**. Add `http://localhost:5173` to its allowed callback, logout, and web origin URLs. Create an **API** for the audience.
3. Install the tools and dependencies, and set your Auth0 values in `.env`:

   ```bash
   git clone git@github.com:tabmadi/react-auth0-example.git
   cd react-auth0-example
   mise install
   mise run setup
   cp .env.example .env
   ```

4. Start the dev server and open `http://localhost:5173`:

   ```bash
   mise run dev
   ```

| Variable | Description |
| --- | --- |
| `VITE_AUTH0_DOMAIN` | The domain of your Auth0 tenant |
| `VITE_AUTH0_CLIENT_ID` | The client ID of your Single Page Application |
| `VITE_AUTH0_AUDIENCE` | The identifier of your Auth0 API |

Vite puts each `VITE_` variable into the browser code at build time. These values are public by design: a single page app has no client secret.

## How it works

All the code is in [`src/main.jsx`](src/main.jsx):

| Component | Does |
| --- | --- |
| `Auth0Provider` | Configures the SDK from the `VITE_` variables |
| `App` | Shows a loading state, an error, the sign-in button, or the signed-in view |
| `LoginButton` and `LogoutButton` | Start and end the session |
| `Profile` | Shows the name from the ID token |
| `LogTokenButton` | Gets an access token and logs it |

## What is deliberately missing

- **An API call**: the app gets a token but sends it nowhere. A real app sends it as `Authorization: Bearer <token>`.
- **Safe token storage**: `cacheLocation="localstorage"` keeps the session across reloads, but any script on the page can read the tokens. The SDK default is memory.
- **Routing and protected routes.**

## Tasks

| Task | Does |
| --- | --- |
| `mise run setup` | Installs the locked dependencies and the git hooks |
| `mise run dev` | Starts the Vite dev server |
| `mise run build` | Builds the app into `dist/` |
| `mise run lint` | Runs `lint:js`, `lint:md`, and `lint:secrets` |
| `mise run format` | Applies every formatter |
| `mise run check` | Runs `lint` and `test`. Run it before you finish a change |
| `mise run ci` | Runs exactly what CI runs. The `pre-push` hook runs it too |

## License

Apache License 2.0. See [LICENSE](LICENSE).
