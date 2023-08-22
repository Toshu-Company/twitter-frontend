import { AtomEffect, atom } from "recoil";
import { localStorageEffect } from "./localstorage";

export const favoriteState = atom<string[]>({
  key: "favorite",
  default: [],
  effects: [localStorageEffect("favorite")],
});
