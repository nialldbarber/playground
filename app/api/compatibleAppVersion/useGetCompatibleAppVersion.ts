import { useGetCompatibleAppVersion } from "@/app/api/compatibleAppVersion/compatibleAppVersion.queries";
import { isAppVersionCompatible } from "@/app/utils/deviceInfo";

export function useIsCompatibleAppVersion() {
	const { data } = useGetCompatibleAppVersion();
	return isAppVersionCompatible(data?.lowestCompatibleAppVersion ?? "");
}
