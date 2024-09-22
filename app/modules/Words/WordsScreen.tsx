import React, { useState } from "react";
import { Text, View, useWindowDimensions } from "react-native";

import { Button } from "@/app/components/Button/Button";
import { Layout } from "@/app/components/Layout";
import { Skeleton } from "@/app/components/Skeleton";
import { useGetWords } from "@/app/modules/Words/words.queries";
import { FadeIn } from "@/app/utils/animations";
export function WordScreen() {
  const { width } = useWindowDimensions();
  const words = useGetWords();
  const [revealedIndices, setRevealedIndices] = useState<number[]>([]);

  const handleRevealNext = () => {
    if (words?.data?.at(0)?.basics) {
      const nextIndex = revealedIndices.length;
      if (nextIndex < words.data[0].basics.length) {
        setRevealedIndices([...revealedIndices, nextIndex]);
      }
    }
  };

  return (
    <>
      <Layout>
        <View className="flex-row justify-between items-center py-3 px-5">
          <Text className="text-4xl font-bold">Words</Text>
        </View>
        <View>
          {words.isLoading && (
            <View className="mt-5">
              <Skeleton.Group count={20}>
                <Skeleton
                  isLoading={words.isLoading}
                  width={width - 20}
                  height={40}
                  style={{
                    marginBottom: 15,
                    alignSelf: "center",
                    borderRadius: 8,
                  }}
                />
              </Skeleton.Group>
            </View>
          )}
          <FadeIn isReady={words.isSuccess}>
            {words?.data?.at(0)?.basics.map((flashcard, index) => (
              <View
                key={index}
                className="flex-row justify-between items-center px-5 py-6"
              >
                <Text className="text-lg font-bold">{flashcard.english}</Text>
                <Text className="text-lg font-bold">
                  {revealedIndices.includes(index) ? flashcard.latvian : "???"}
                </Text>
              </View>
            ))}
          </FadeIn>
        </View>
      </Layout>
      <Button onPress={handleRevealNext}>Reveal next</Button>
    </>
  );
}
