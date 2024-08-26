import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  isReady: boolean;
};

export function FadeIn({ isReady, children }: PropsWithChildren<Props>) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = isReady ? withTiming(1) : withTiming(0);
  }, [isReady]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}
