import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { createRoot } from "react-dom/client";

function LoginButton() {
	const { loginWithRedirect } = useAuth0();
	return (
		<button type="button" onClick={() => loginWithRedirect()}>
			Log in
		</button>
	);
}

function LogoutButton() {
	const { logout } = useAuth0();
	return (
		<button
			type="button"
			onClick={() =>
				logout({ logoutParams: { returnTo: window.location.origin } })
			}
		>
			Log out
		</button>
	);
}

function Profile() {
	const { user } = useAuth0();
	return <div>Hello {user.name}</div>;
}

function LogTokenButton() {
	const { getAccessTokenSilently } = useAuth0();
	const handleClick = async () => {
		const token = await getAccessTokenSilently();
		console.info(token);
	};
	return (
		<button type="button" onClick={handleClick}>
			Log access token
		</button>
	);
}

function App() {
	const { isAuthenticated, isLoading, error } = useAuth0();

	if (isLoading) {
		return <div>Loading</div>;
	}
	if (error) {
		return <div>Error: {error.message}</div>;
	}
	if (!isAuthenticated) {
		return <LoginButton />;
	}
	return (
		<>
			<Profile />
			<LogTokenButton />
			<LogoutButton />
		</>
	);
}

createRoot(document.getElementById("root")).render(
	<Auth0Provider
		domain={import.meta.env.VITE_AUTH0_DOMAIN}
		clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
		cacheLocation="localstorage"
		authorizationParams={{
			redirect_uri: window.location.origin,
			audience: import.meta.env.VITE_AUTH0_AUDIENCE,
		}}
	>
		<App />
	</Auth0Provider>,
);
