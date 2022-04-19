import { atom } from "recoil";

export const test = atom({
  key: "test",
  default: "Hello Starving!!!!",
});

export const showImagesState = atom({
  key: "showImagesState",
  default: [],
});
