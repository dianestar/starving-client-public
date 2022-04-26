import { atom, selector } from "recoil";

export const test = atom({
  key: "test",
  default: "Hello Starving!!!!",
});

export const showImagesState = atom({
  key: "showImages",
  default: [],
});
