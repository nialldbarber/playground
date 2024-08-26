import { BASE_URL, get } from "@/app/api/http";
import type { Pokemon } from "@/app/modules/Pokemon/pokeapi";

type IndividualPokemon = {
  name: string;
  url: string;
};

type PokemonT = {
  count: number;
  next: string;
  previous: string;
  results: IndividualPokemon[];
};

export const getPokemon = async () => {
  try {
    const response = await get<PokemonT>(BASE_URL, "/pokemon");
    return response.results;
  } catch (error) {
    console.error(error);
  }
};

export const getIndividualPokemon = async (name: string) => {
  try {
    const response = await get<Pokemon>(BASE_URL, `/pokemon/${name}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};