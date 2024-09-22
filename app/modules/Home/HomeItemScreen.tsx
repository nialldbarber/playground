import { Button } from "@/app/components/Button/Button";
import { Share, Text, View } from "react-native";
import Animated from "react-native-reanimated";

import { ReferralLink } from "@/app/components/ReferralLink";
import { HomeItemNavigation } from "@/app/navigation";

interface Props extends HomeItemNavigation {}

export function HomeItemScreen({ navigation, route }: Props) {
  const handleShare = async (url: string) => {
    Share.share({
      message: "yo this is a message",
      url,
    });
  };

  return (
    <>
      <Animated.Image
        source={{ uri: `https://picsum.photos/id/${route.params?.id}/1000` }}
        style={{ width: "100%", height: 300 }}
        sharedTransitionTag={`tag-${route.params?.id}`}
      />
      <View className="p-5">
        <Text className="text-4xl font-bold">Home Item</Text>
        <Button
          onPress={navigation.goBack}
          className="bg-red-400 p-3 rounded-md my-3 w-full"
        >
          <Text className="text-white text-center font-bold">Go back</Text>
        </Button>
        <View className="mt-5">
          <ReferralLink handleReferral={handleShare} />
        </View>
      </View>
    </>
  );
}
