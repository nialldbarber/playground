import { Button } from "@/app/components/Button";
import { Text, View } from "react-native";

type Props = {
  handleReferral: (url: string) => void;
};

export function ReferralLink({ handleReferral }: Props) {
  return (
    <View>
      <Text className="text-lg font-bold">Share your link</Text>
      <View className="flex-row items-center justify-between bg-gray-200 p-3 rounded-md">
        <View className="flex-1 mr-2">
          <Text numberOfLines={1} ellipsizeMode="tail">
            https://myrac.com/referral/1234567890423423424
          </Text>
        </View>
        <Button
          className="bg-red-400 p-2 rounded-md"
          onPress={() =>
            handleReferral("https://myrac.com/referral/1234567890423423424")
          }
        >
          <Text className="text-white text-center font-bold">Copy</Text>
        </Button>
      </View>
    </View>
  );
}
