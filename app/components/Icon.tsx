import { Image } from "react-native";

import type { IconName } from "@/app/components/types";

type Props = {
	name: IconName;
	color: string;
	size: number;
};

export function Icon({ name, color, size }: Props) {
	return <Image />;
}
