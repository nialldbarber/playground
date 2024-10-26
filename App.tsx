import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useNavigationContainerRef } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { queryClient } from "@/app/api";
import { Text } from "@/app/components/Text";
import "@/app/global.css";
import { Navigation } from "@/app/navigation";
import { LaunchDarkly } from "@/app/services/launch-darkly";

import "./gesture-handler";

if (__DEV__) {
	require("@/app/utils/reactotron");
}

function App() {
	const navigationRef = useNavigationContainerRef();

	return (
		<BottomSheetModalProvider>
			<QueryClientProvider client={queryClient}>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<LaunchDarkly>
						<BottomSheetModalProvider>
							<Navigation
								ref={navigationRef}
								linking={{
									enabled: "auto",
									prefixes: ["lvwords://"],
								}}
								fallback={<Text>Loading...</Text>}
							/>
						</BottomSheetModalProvider>
					</LaunchDarkly>
				</GestureHandlerRootView>
			</QueryClientProvider>
		</BottomSheetModalProvider>
	);
}

export default App;
// export { default } from "./.storybook";
