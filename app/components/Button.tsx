import type { PropsWithChildren } from "react";
import type { PressableProps, ViewStyle } from "react-native";
import { Pressable, Text } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

interface Props extends PressableProps {
  style?: ViewStyle;
  className?: string;
}

export function Button({
  className,
  style,
  children,
  ...rest
}: PropsWithChildren<Props>) {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.97);
  };
  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Animated.View
      style={[{ transform: [{ scale }] }, style]}
      className={`bg-blue-400 p-4 rounded-md ${className}`}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className="items-center justify-center"
        {...rest}
      >
        <Text className="text-xl text-white font-bold">{children}</Text>
      </Pressable>
    </Animated.View>
  );
}
