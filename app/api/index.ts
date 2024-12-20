import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const STALE = {
	SECONDS: {
		FIFTEEN: 1e3 * 15,
		THIRTY: 1e3 * 30,
	},
	MINUTES: {
		ONE: 1e3 * 60,
		FIVE: 1e3 * 60 * 5,
	},
	HOURS: {
		ONE: 1e3 * 60 * 60,
	},
	DAYS: {
		ONE: 1e3 * 60 * 60 * 24,
	},
	INFINITY: Number.POSITIVE_INFINITY,
};
