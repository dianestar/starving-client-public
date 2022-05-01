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
    url: `recipe/category?page=${page}&size=${size}&values=${values}`,
  });
};

export const GET_MY_RECIPE = (page, size) => {
  return Api({
    method: METHOD.GET,
    url: `recipe/my?page=${page}&size=${size}`,
  });
};

export const GET_ONE_RECIPE = (pk) => {
  return Api({
    method: METHOD.GET,
    url: `recipe/one?pk=${pk}`,
  });
};

export const UPLOAD_RECIPE = (form) => {
  return Api({
    method: METHOD.POST,
    url: "recipe",
    data: form,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const DELETE_RECIPE = (pk) => {
  return Api({
    method: METHOD.DELETE,
    url: `recipe?pk=${pk}`,
  });
};

export const PATCH_RECIPE = (form) => {
  return Api({
    method: METHOD.PATCH,
    url: "recipe",
    data: form,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const GET_SEARCH_RECIPE = (page, size, keyword) => {
  return Api({
    method: METHOD.GET,
    url: `recipe/search?page=${page}&size=${size}&keyword=${keyword}`,
  });
};
