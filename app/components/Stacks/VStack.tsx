import type { PropsWithChildren } from "react";

import { Stack } from "@/app/components/Stacks";
import type { SizingProps } from "@/app/components/types";

export function VStack({
	spacing = "0",
	gap = "0",
	debug = false,
	reverse = false,
	children,
}: PropsWithChildren<SizingProps>) {
	return (
		<Stack
			orientation="vertical"
			spacing={spacing}
			gap={gap}
			debug={debug}
			reverse={reverse}
		>
			{children}
		</Stack>
	);
}
