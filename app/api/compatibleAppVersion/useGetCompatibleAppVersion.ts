import { useGetCompatibleAppVersion } from "@/app/api/compatibleAppVersion/compatibleAppVersion.queries";
import { isAppVersionCompatible } from "@/app/utils/deviceInfo";

export function useIsCompatibleAppVersion() {
	const { data } = useGetCompatibleAppVersion();

	const isCompatible = isAppVersionCompatible(
		data?.minSupportedVersion ?? "",
		data?.preferredVersion ?? "",
	);

	return isCompatible;
}
