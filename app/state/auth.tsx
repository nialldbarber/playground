import { createContext, useContext, useState } from "react";

import type { PropsWithChildren } from "react";

export const AuthContext = createContext<{
	isSignedIn: boolean;
	setIsSignedIn?: (isSignedIn: boolean) => void;
}>({
	isSignedIn: false,
});

export function useIsAuthenticated() {
	const isAuthed = useContext(AuthContext);
	return isAuthed.isSignedIn;
}

export function useIsNotAuthenticated() {
	const isNotAuthed = !useIsAuthenticated();
	return isNotAuthed;
}

export const AuthProvider = (props: PropsWithChildren<{}>) => {
	const [isSignedIn, setIsSignedIn] = useState(false);
	return (
		<AuthContext.Provider
			value={{
				isSignedIn,
				setIsSignedIn,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};
