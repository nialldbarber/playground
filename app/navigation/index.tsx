import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { StaticParamList } from "@react-navigation/native";
import { createStaticNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Book1, Grammerly, Home2, Profile } from "iconsax-react-native";

import { SignInScreen } from "@/app/modules/Authentication/SignInScreen";
import { SignOutScreen } from "@/app/modules/Authentication/SignOutScreen";
import { HomeItemScreen } from "@/app/modules/Home/HomeItemScreen";
import { HomeScreen } from "@/app/modules/Home/HomeScreen";
import { OnboardingScreen } from "@/app/modules/Onboarding/OnboardingScreen";
import { IndividualPokemonScreen } from "@/app/modules/Pokemon/IndividualPokemonScreen";
import { PokemonPicsScreen } from "@/app/modules/Pokemon/PokemonPicsScreen";
import { PokemonScreen } from "@/app/modules/Pokemon/PokemonScreen";
import { ProfileScreen } from "@/app/modules/Profile/ProfileScreen";
import { SettingsScreen } from "@/app/modules/Settings/Settings";
import { WordScreen } from "@/app/modules/Words/WordsScreen";
import { useIsAuthenticated, useIsNotAuthenticated } from "@/app/state/auth";

const HomeStack = createNativeStackNavigator({
	initialRouteName: "Home",
	screenOptions: { headerShown: false },
	screens: {
		Home: HomeScreen,
		HomeItem: HomeItemScreen,
	},
});
export type HomeStackParamList = {
	Home: undefined;
	HomeItem: { id: string | number };
};

const PokemonStack = createNativeStackNavigator({
	initialRouteName: "Pokemon",
	screenOptions: { headerShown: false },
	screens: {
		Pokemon: PokemonScreen,
		IndividualPokemon: IndividualPokemonScreen,
		PokemonPics: PokemonPicsScreen,
	},
});
export type PokemonStackParamList = {
	Pokemon: undefined;
	IndividualPokemon: { pokemonName: string };
	PokemonPics: undefined;
};

/** bottom tab stack */
const BottomTabStack = createBottomTabNavigator({
	initialRouteName: "HomeStack",
	screens: {
		HomeStack,
		Profile: ProfileScreen,
		Words: WordScreen,
		PokemonStack,
	},
	screenOptions: ({ route }) => ({
		headerShown: false,
		animation: "shift",
		tabBarIcon: ({ focused, color, size }) => {
			if (route.name === "HomeStack") {
				return (
					<Home2
						size="32"
						color="#FF8A65"
						variant={focused ? "Bold" : "Outline"}
					/>
				);
			}
			if (route.name === "Profile") {
				return (
					<Profile
						size="32"
						color="#FF8A65"
						variant={focused ? "Bold" : "Outline"}
					/>
				);
			}
			if (route.name === "Words") {
				return (
					<Book1
						size="32"
						color="#FF8A65"
						variant={focused ? "Bold" : "Outline"}
					/>
				);
			}
			if (route.name === "PokemonStack") {
				return (
					<Grammerly
						size="32"
						color="#FF8A65"
						variant={focused ? "Bold" : "Outline"}
					/>
				);
			}
		},
	}),
});
export type BottomTabStackParamList = StaticParamList<typeof BottomTabStack>;

const OnboardingSignUpStack = createNativeStackNavigator({
	initialRouteName: "SignIn",
	screens: {
		SignIn: SignInScreen,
		OnboardingScreen: OnboardingScreen,
	},
	screenOptions: {
		headerShown: false,
	},
});
export type OnboardingStackParamList = {
	SignIn: undefined;
	OnboardingScreen: undefined;
};
export type OnboardingSignUpScreenProps = NativeStackNavigationProp<
	OnboardingStackParamList,
	"SignIn"
>;

/** root stack */
const RootStack = createNativeStackNavigator({
	groups: {
		SignedIn: {
			if: useIsAuthenticated,
			screenOptions: { headerShown: false },
			screens: {
				BottomTabStack,
			},
		},
		SignedOut: {
			if: useIsNotAuthenticated,
			screenOptions: { headerShown: false },
			screens: {
				OnboardingSignUpStack,
			},
		},
		Modal: {
			if: useIsAuthenticated,
			screenOptions: {
				presentation: "modal",
				headerShown: false,
				contentStyle: { backgroundColor: "transparent" },
			},
			screens: {
				Settings: SettingsScreen,
				SignOut: SignOutScreen,
			},
		},
	},
});
type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

export const Navigation = createStaticNavigation(RootStack);
