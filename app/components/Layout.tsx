import { useNavigation } from "@react-navigation/native";
import { ArrowLeft2 } from "iconsax-react-native";
import { forwardRef, type PropsWithChildren } from "react";
import type { ScrollViewProps } from "react-native";
import { Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props extends ScrollViewProps {
  goBack?: boolean;
}

export const Layout = forwardRef<Animated.ScrollView, PropsWithChildren<Props>>(
  ({ children, goBack = false, ...rest }: PropsWithChildren<Props>, ref) => {
    const { goBack: back } = useNavigation();
    const insets = useSafeAreaInsets();

    return (
      <Animated.ScrollView
        ref={ref}
        contentContainerStyle={{
          position: "relative",
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
        showsVerticalScrollIndicator={false}
        {...rest}
      >
        {goBack && (
          <Pressable onPress={back} className="p-3">
            <ArrowLeft2 size={30} color="black" />
          </Pressable>
        )}
        {children}
      </Animated.ScrollView>
    );
  }
);
