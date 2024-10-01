export const trackEvent = (eventName: string, data: Record<string, string>) => {
	console.log(`Tracking event: ${eventName}`, data);
};
