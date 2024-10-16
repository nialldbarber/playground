import { useQuery } from "@tanstack/react-query";

import { getWords } from "@/app/modules/Words/words.services";

export function useGetWords() {
	return useQuery({
		queryKey: ["words"],
		queryFn: getWords,
	});
}
