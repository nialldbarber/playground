import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useNavigationContainerRef } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { queryClient } from "@/app/api";
import { Text } from "@/app/components/Text";
import "@/app/global.css";
import { Navigation } from "@/app/navigation";

import "./gesture-handler";

export default function App() {
	const navigationRef = useNavigationContainerRef();

	return (
		<QueryClientProvider client={queryClient}>
			<GestureHandlerRootView style={{ flex: 1 }}>
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
			</GestureHandlerRootView>
		</QueryClientProvider>
	);
}
