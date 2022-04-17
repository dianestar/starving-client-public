import Api, { METHOD } from "./interceptor";

export const GET_ALL_RECIPE = (page, size) => {
  return Api({
    method: METHOD.GET,
    url: `recipe/all?page=${page}&size=${size}`,
  });
};

export const GET_CATEGORY_RECIPE = (page, size, values) => {
  return Api({
    method: METHOD.GET,
    url: `recipe/category?page=${page}&size=${size}&values=${values}`
  });
};