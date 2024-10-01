import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, View } from "react-native";

import { Layout } from "@/app/components/Layout";
import { Text } from "@/app/components/Text";
import { useGetPokemon } from "@/app/modules/Pokemon/pokemon.queries";
import type { PokemonStackParamList } from "@/app/navigation";

type PokemonScreenNavigationProp = NativeStackNavigationProp<
	PokemonStackParamList,
	"IndividualPokemon"
>;

export function PokemonScreen() {
	const pokemon = useGetPokemon();
	const { navigate } = useNavigation<PokemonScreenNavigationProp>();

	return (
		<Layout>
			<View className="flex-row justify-between items-center py-3 px-5">
				<Text className="text-4xl font-bold">Pokemon</Text>
			</View>
			<View className="m-4">
				{pokemon.isLoading && <Text>Loading...</Text>}
				{pokemon.error && <Text>Error: {pokemon.error.message}</Text>}
				<View className="flex-1 flex-row flex-wrap">
					{pokemon?.data?.map((pokemon) => (
						<Pressable
							key={pokemon.name}
							className="items-center justify-center w-1/2 py-5 px-3 border-b border-red-400"
							onPress={() =>
								navigate("IndividualPokemon", { pokemonName: pokemon.name })
							}
						>
							<Text>{pokemon?.name}</Text>
						</Pressable>
					))}
				</View>
			</View>
		</Layout>
	);
}
