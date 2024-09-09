import type { LinkProps } from "@react-navigation/native";
import { useLinkProps } from "@react-navigation/native";
import type { PropsWithChildren } from "react";
import { Pressable, Text } from "react-native";

export function Link({
  screen,
  params,
  action,
  href,
  children,
  ...rest
}: PropsWithChildren<LinkProps<>>) {
  const props = useLinkProps({ screen, params, action, href });
  return (
    <Pressable {...props} {...rest}>
      <Text>{children}</Text>
    </Pressable>
  );
}
