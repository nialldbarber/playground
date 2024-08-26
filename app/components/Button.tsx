import type { PropsWithChildren } from "react";
import type { PressableProps } from "react-native";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

interface Props extends PressableProps {}

export function Button({ children, ...rest }: PropsWithChildren<Props>) {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };
  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Animated.View
      style={{ transform: [{ scale }] }}
      className="bg-blue-400 p-6 min-h-16 rounded-md"
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className="items-center justify-center"
        style={StyleSheet.absoluteFillObject}
        {...rest}
      >
        <Text className="text-xl text-white font-bold">{children}</Text>
      </Pressable>
    </Animated.View>
  );
}
