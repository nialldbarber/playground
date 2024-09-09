import { useNavigation } from "@react-navigation/native";
import { ArrowLeft2 } from "iconsax-react-native";
import type { PropsWithChildren } from "react";
import type { ScrollViewProps } from "react-native";
import { Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props extends ScrollViewProps {
  goBack?: boolean;
}

export function Layout({
  children,
  goBack = false,
  ...rest
}: PropsWithChildren<Props>) {
  const { goBack: back } = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={{
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
    </ScrollView>
  );
}
