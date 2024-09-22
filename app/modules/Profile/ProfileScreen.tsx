import { Button } from "@/app/components/Button/Button";
import { Layout } from "@/app/components/Layout";
import { useEffect, useState } from "react";
import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { Text, useWindowDimensions, View } from "react-native";
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from "react-native-reanimated";

export function ProfileScreen() {
  const [isNearBottom, setIsNearBottom] = useState(false);

  const { width } = useWindowDimensions();
  const OFFSCREEN = width / 2;

  const staticButton = useSharedValue(0);
  const absoluteButton = useSharedValue(0);

  const staticButtonStyles = useAnimatedStyle(() => ({
    left: staticButton.value,
  }));
  const absoluteButtonStyles = useAnimatedStyle(() => ({
    right: absoluteButton.value,
  }));

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollY = event.nativeEvent.contentOffset.y;
    const viewHeight = event.nativeEvent.layoutMeasurement.height;

    const isNearBottom = scrollY + viewHeight >= contentHeight - 60;
    setIsNearBottom(isNearBottom);
  };

  const springConfig: WithSpringConfig = {
    duration: 1200,
    dampingRatio: 0.5,
    stiffness: 1000,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 2,
    reduceMotion: ReduceMotion.System,
  };

  useEffect(() => {
    if (isNearBottom) {
      absoluteButton.value = withSpring(-OFFSCREEN, springConfig);
      staticButton.value = withSpring(0, springConfig);
    } else {
      absoluteButton.value = withSpring(0, springConfig);
      staticButton.value = withSpring(width, springConfig);
    }
  }, [isNearBottom]);

  return (
    <>
      <Layout onScroll={handleScroll} scrollEventThrottle={16}>
        <View className="justify-between pt-3 pb-10 px-5">
          {Array.from({ length: 100 }).map((_, index) => (
            <Text key={index} className="text-4xl font-bold">
              Profile
            </Text>
          ))}
        </View>
        {/* static button */}
        <Animated.View
          className="absolute bottom-0 w-[90%]"
          style={staticButtonStyles}
        >
          <Button>Add stuff</Button>
          <Button size="medium">Add stuff</Button>
          <Button size="large">Add stuff</Button>
        </Animated.View>
      </Layout>
      {/* absolute button */}
      <Animated.View
        className="absolute bottom-10 right-5"
        style={absoluteButtonStyles}
      >
        <Button
          style={{
            width: 200,
          }}
        >
          Add stuff
        </Button>
      </Animated.View>
    </>
  );
}
