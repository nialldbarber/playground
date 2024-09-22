import { Button } from "@/app/components/Button/Button";
import { Dots } from "@/app/components/Dots";
import { Layout } from "@/app/components/Layout";
import { isSignedInAtom } from "@/app/state/auth";
import { useSetAtom } from "jotai";
import { PropsWithChildren, useEffect, useState } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const ORANGE = "rgba(249, 81, 8, 1)";
const ORANGE_ONE = "rgba(249, 81, 8, 0.9)";
const ORANGE_TWO = "rgba(249, 81, 8, 0.8)";

function SectionWrapper({
  isActive,
  backgroundColor,
  children,
}: PropsWithChildren<{
  isActive: boolean;
  backgroundColor: string;
}>) {
  const { width, height } = useWindowDimensions();

  const opacity = useSharedValue(0);
  const transformY = useSharedValue(30);

  const animatedStyles = useAnimatedStyle(
    () => ({
      opacity: opacity.value,
      transform: [
        {
          translateY: transformY.value,
        },
      ],
    }),
    []
  );

  useEffect(() => {
    if (isActive) {
      opacity.value = withDelay(180, withTiming(1));
      transformY.value = withDelay(180, withTiming(0));
    } else {
      opacity.value = withDelay(180, withTiming(0));
      transformY.value = withDelay(180, withTiming(30));
    }
  }, [isActive]);

  return (
    <View style={[{ backgroundColor }]}>
      <Animated.View
        style={[{ width, height }, animatedStyles]}
        className="justify-center items-center"
      >
        {children}
      </Animated.View>
    </View>
  );
}

export function OnboardingScreen() {
  const setIsSignedIn = useSetAtom(isSignedInAtom);

  const { width } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const currentIndex = useSharedValue(0);

  const [currentIndexText, setCurrentIndexText] = useState(0);
  const updateCurrentIndexState = (value: number) => {
    setCurrentIndexText(value);
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = -currentIndex.value * width + event.translationX;
    })
    .onEnd((event) => {
      const direction = event.translationX > 0 ? -1 : 1;
      const nextIndex = currentIndex.value + direction;

      if (Math.abs(event.translationX) > width / 2) {
        if (nextIndex >= 0 && nextIndex <= 2) {
          currentIndex.value = nextIndex;
          runOnJS(updateCurrentIndexState)(nextIndex);
        }
      }

      translateX.value = withTiming(-currentIndex.value * width);
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const goToScreen = (index: number) => {
    currentIndex.value = index;
    translateX.value = withTiming(-index * width);
    updateCurrentIndexState(index);
  };

  return (
    <>
      <Layout>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[{ flexDirection: "row" }, animatedStyle]}>
            <SectionWrapper
              isActive={currentIndexText === 0}
              backgroundColor={ORANGE}
            >
              <Text className="text-white text-4xl font-bold">Name</Text>
            </SectionWrapper>
            <SectionWrapper
              isActive={currentIndexText === 1}
              backgroundColor={ORANGE_ONE}
            >
              <Text className="text-white text-4xl font-bold">Password</Text>
            </SectionWrapper>
            <SectionWrapper
              isActive={currentIndexText === 2}
              backgroundColor={ORANGE_TWO}
            >
              <Text className="text-white text-4xl font-bold">DOB</Text>
              <Button className="w-full" onPress={() => setIsSignedIn?.(true)}>
                Log in
              </Button>
            </SectionWrapper>
          </Animated.View>
        </GestureDetector>
      </Layout>
      <View className="absolute bottom-5 w-full h-20 z-10">
        <View className="flex items-center justify-center">
          <Dots count={3} activeIndex={currentIndex} goToScreen={goToScreen} />
        </View>
      </View>
    </>
  );
}
