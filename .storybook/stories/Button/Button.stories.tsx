import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";

import { POCButton } from "../../../app/components/POCButton/POCButton";

const meta = {
	title: "Button",
	component: POCButton,
	argTypes: {
		onPress: {
			action: "pressed the button",
		},
		variant: {
			control: "radio",
			options: ["primary", "secondary", "tertiary"],
		},
		size: {
			control: "radio",
			options: ["full", "compact"],
		},
		isLoading: {},
		isDisabled: {
			control: "boolean",
		},
		icon: {
			control: "select",
			options: ["chevron", "none"],
		},
	},
	decorators: [
		(Story) => (
			<View style={{ padding: 16, alignItems: "flex-start" }}>
				<Story />
			</View>
		),
	],
} satisfies Meta<typeof POCButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Size: Story = {
	args: {
		size: "compact",
		children: "Hello world!",
	},
};

export const IsLoading: Story = {
	args: {
		size: "compact",
		children: "Hello world!",
		isLoading: true,
	},
};

export const IsDisabled: Story = {
	args: {
		size: "compact",
		children: "Hello world!",
		isDisabled: true,
	},
};

export const Variant: Story = {
	args: {
		variant: "primary",
		children: "Hello world!",
	},
};

export const Icon: Story = {
	args: {
		variant: "primary",
		children: "Hello world!",
		icon: "chevron",
	},
};
