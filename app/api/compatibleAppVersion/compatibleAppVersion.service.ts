import { get } from "@/app/api/http";

const BASE_URL = "https://gist.githubusercontent.com/nialldbarber";

type CompatibleAppVersion = {
	minSupportedVersion: string;
	preferredVersion: string;
};

export async function getCompatibleAppVersion() {
	try {
		const response = await get<CompatibleAppVersion>({
			baseUrl: BASE_URL,
			path: "/e6109736143c1adfdfd978b61acd50c1/raw/b22bbbba42f8b02d950f368301527353885b0b40/compatible-version.json",
		});
		return response;
	} catch (error) {
		console.error(error);
		throw error;
	}
}
