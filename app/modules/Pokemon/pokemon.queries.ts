import {
	getIndividualPokemon,
	getPokemon,
} from "@/app/modules/Pokemon/pokemon.services";
import { useQuery } from "@tanstack/react-query";

export const useGetPokemon = () => {
	return useQuery({
		queryKey: ["pokemon"],
		queryFn: getPokemon,
	});
};

export const useGetIndividualPokemon = (name: string) => {
	return useQuery({
		queryKey: ["pokemon", name],
		queryFn: () => getIndividualPokemon(name),
	});
};
