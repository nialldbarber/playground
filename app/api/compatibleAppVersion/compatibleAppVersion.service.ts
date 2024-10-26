import { get } from "@/app/api/http";

const BASE_URL = "https://gist.githubusercontent.com/nialldbarber";

export async function getCompatibleAppVersion() {
	try {
		const response = await get<{ lowestCompatibleAppVersion: string }>({
			baseUrl: BASE_URL,
			path: "/e6109736143c1adfdfd978b61acd50c1/raw/faeeb37c45f8e0bab0772243c359232975e52555/compatible-version.json",
		});
		return response;
	} catch (error) {
		console.error(error);
	}
}
