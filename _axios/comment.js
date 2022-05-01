import Api, { METHOD } from "./interceptor";

export const POST_COMMENT = (form) => {
  return Api({
    method: METHOD.POST,
    url: "comment",
    data: form,
  });
};

export const GET_COMMENT = (page, size, recipePk) => {
  return Api({
    method: METHOD.GET,
    url: `comment?page=${page}&size=${size}&recipePk=${recipePk}`,
  });
};

export const PATCH_COMMENT = (form) => {
  return Api({
    method: METHOD.PATCH,
    url: "comment",
    data: form,
  });
};

export const DELETE_COMMENT = (pk) => {
  return Api({
    method: METHOD.DELETE,
    url: `comment?pk=${pk}`,
  });
};
