import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import type { PropsWithChildren } from "react";
import { forwardRef, useImperativeHandle, useMemo } from "react";

export type BottomSheetMethods = {
	openModal: () => void;
	closeModal: () => void;
};

type Props = {
	snapPoints?: string[];
};

export const BottomSheet = forwardRef<
	BottomSheetMethods,
	PropsWithChildren<Props>
>(({ snapPoints = ["25%", "50%"], children }, ref) => {
	const _snapPoints = useMemo(() => ["25%", "50%"], []);

	useImperativeHandle(ref, () => ({
		// @ts-ignore
		openModal: () => ref?.current?.present(),
		// @ts-ignore
		closeModal: () => ref?.current?.close(),
	}));

	return (
		<BottomSheetModal
			ref={ref}
			index={1}
			snapPoints={_snapPoints}
			backdropComponent={BottomSheetBackdrop}
		>
			{children}
		</BottomSheetModal>
	);
});
