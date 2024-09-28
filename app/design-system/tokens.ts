export const spacing = {
	full: "100%",
	"0": 0,
	px: 1,
	"1": 4,
	"2": 8,
	"3": 12,
	"4": 16,
	"5": 20,
	"6": 24,
	"7": 28,
	"8": 32,
	"9": 36,
	"10": 40,
	"12": 48,
	"14": 56,
	"16": 64,
	"20": 80,
	"24": 96,
	"28": 112,
	"32": 128,
	"36": 144,
	"40": 160,
	"44": 176,
	"48": 192,
	"52": 208,
	"56": 224,
	"60": 240,
	"64": 256,
	"72": 288,
	"80": 320,
} as const;
export type Spacing = keyof typeof spacing;

export const fontSize = {
	xs: 12,
	sm: 14,
	base: 16,
	lg: 18,
	xl: 20,
	"2xl": 24,
	"3xl": 30,
	"4xl": 36,
	"5xl": 48,
	"6xl": 60,
	"7xl": 72,
} as const;
export type FontSize = keyof typeof fontSize;

export const fontWeight = {
	normal: "PlusJakartaSans-Regular",
	bold: "PlusJakartaSans-Bold",
	semibold: "PlusJakartaSans-SemiBold",
	medium: "PlusJakartaSans-Medium",
	light: "PlusJakartaSans-Light",
} as const;
export type FontWeight = keyof typeof fontWeight;

export const lineHeight = {
	normal: 24,
	none: 16,
	tight: 20,
	snug: 22,
	relaxed: 26,
	loose: 32,
} as const;
export type LineHeight = keyof typeof lineHeight;

export const radii = {
	none: 0,
	sm: 2,
	default: 4,
	md: 6,
	lg: 8,
	full: 9999,
} as const;
export type Radii = keyof typeof radii;

export const zIndex = {
	"0": 0,
	"1": 1,
	"2": 2,
	"3": 3,
	"4": 4,
	"5": 5,
	"10": 10,
	"999": 999,
} as const;
export type ZIndex = keyof typeof zIndex;

export const negativeZIndex = {
	"-1": -1,
	"-2": -2,
	"-3": -3,
	"-4": -4,
	"-5": -5,
	"-10": -10,
	"-999": -999,
} as const;
export type NegativeZIndex = keyof typeof negativeZIndex;
