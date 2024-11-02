import { useQuery } from "@tanstack/react-query";

import { getCompatibleAppVersion } from "@/app/api/compatibleAppVersion/compatibleAppVersion.service";

export function useGetCompatibleAppVersion() {
	return useQuery({
		queryKey: ["compatibleAppVersion"],
		queryFn: getCompatibleAppVersion,
	});
}
