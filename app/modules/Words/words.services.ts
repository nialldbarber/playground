import { get } from "@/app/api/http";

const BASE_URL = "https://gist.githubusercontent.com/nialldbarber/";

type Word = {
	english: string;
	latvian: string;
};

type Words = {
	basics: Word[];
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getWords = async () => {
	await wait(3000);
	try {
		const response = await get<Words[]>({
			path: "/94ae943b415eae3b3e41b074cdde7508/raw/ffc2f6b839402eba0719310ab4446a305b92776a/lv-basics.json",
			baseUrl: BASE_URL,
		});
		return response;
	} catch (error) {
		console.error(error);
	}
};
