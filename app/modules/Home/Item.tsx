import { HomeItemNavigation } from "@/app/navigation";
import { Pressable, useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type Props = {
  id: number;
  index: number;
} & HomeItemNavigation;

export function Item({ id, index, navigate }: Props) {
  const { width } = useWindowDimensions();
  const itemScale = useSharedValue(1);

  const itemScaleStyles = useAnimatedStyle(() => ({
    transform: [{ scale: itemScale.value }],
  }));

  const itemWidth = width / 2 - 20;

  return (
    <Animated.View
      style={itemScaleStyles}
      className={`h-[200px] w-[${itemWidth}px]`}
    >
      <Pressable
        onPress={() => navigate("HomeItem", { id })}
        onPressIn={() => {
          itemScale.value = withSpring(0.97);
        }}
        onPressOut={() => {
          itemScale.value = withSpring(1);
        }}
      >
        <Animated.Image
          source={{ uri: `https://picsum.photos/id/${index + 100}/200` }}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 10,
            overflow: "hidden",
          }}
          sharedTransitionTag={`tag-${id}`}
          className="rounded-lg overflow-hidden bg-red-400"
        />
      </Pressable>
    </Animated.View>
  );
}
