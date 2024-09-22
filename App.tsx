import { useNavigationContainerRef } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { useCallback } from "react";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { queryClient } from "@/app/api";
import "@/app/global.css";
import { Navigation } from "@/app/navigation";

import "./gesture-handler";

export default function App() {
  const navigationRef = useNavigationContainerRef();

  const handleStateChange = useCallback((state: any) => {
    console.log("New state:", state);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigation
          ref={navigationRef}
          linking={{
            enabled: "auto",
            prefixes: ["lvwords://"],
          }}
          fallback={<Text>Loading...</Text>}
          onStateChange={handleStateChange}
        />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
