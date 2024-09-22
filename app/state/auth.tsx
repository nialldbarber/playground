import { atom, useAtomValue } from "jotai";

export const isSignedInAtom = atom(false);

export function useIsAuthenticated() {
  const isAuthed = useAtomValue(isSignedInAtom);
  return isAuthed;
}

export function useIsNotAuthenticated() {
  const isNotAuthed = !useIsAuthenticated();
  return isNotAuthed;
}
