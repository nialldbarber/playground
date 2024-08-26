import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, View } from "react-native";

import { Button } from "@/app/components/Button";
import { Layout } from "@/app/components/Layout";
import { useGetIndividualPokemon } from "@/app/modules/Pokemon/pokemon.queries";
import { PokemonStackParamList } from "@/app/navigation";

type IndividualPokemonScreenNavigationProp = NativeStackNavigationProp<
  PokemonStackParamList,
  "PokemonPics"
>;

export function IndividualPokemonScreen() {
  const { preload, navigate } =
    useNavigation<IndividualPokemonScreenNavigationProp>();
  const { params } =
    useRoute<RouteProp<PokemonStackParamList, "IndividualPokemon">>();
  const { data, isLoading, error } = useGetIndividualPokemon(
    params?.pokemonName
  );

  console.log(data);

  return (
    <Layout goBack>
      <View>
        <View className="flex-row justify-between items-center py-3 px-5">
          <Text className="text-4xl font-bold">{data?.name}</Text>
          <Text className="text-4xl font-bold">{data?.height}</Text>
        </View>
        <Button onPress={() => preload("PokemonPics")}>
          Would you like to see pics?
        </Button>
        <Button onPress={() => navigate("PokemonPics")}>Goooooo</Button>
      </View>
    </Layout>
  );
}
