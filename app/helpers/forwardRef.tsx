import type { ComponentType, Ref } from "react";
import { forwardRef } from "react";

export function withForwardRef<T, P>(Component: ComponentType<P>) {
  return forwardRef((props: P, ref: Ref<T>) => (
    <Component {...props} ref={ref} />
  ));
}
