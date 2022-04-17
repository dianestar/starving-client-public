import Api, { METHOD } from "./interceptor";

export const GET_ALL_RECIPE = (page, size) => {
  return Api({
    method: METHOD.GET,
    url: `recipe/all?page=${page}&size=${size}`,
  });
};
