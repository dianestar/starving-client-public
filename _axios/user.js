import Api, { METHOD } from "./interceptor";

export const REGISTER = (form) => {
  return Api({
    method: METHOD.POST,
    url: "auth/register",
    data: form,
  });
};

export const LOGIN = (form) => {
  return Api({
    method: METHOD.POST,
    url: "auth/login",
    data: form,
  });
};

export const UPDATE = (form) => {
  return Api({
    method: METHOD.PATCH,
    url: "auth",
    data: form,
  });
};

export const UPLOAD_AVATAR = (form) => {
  return Api({
    method: METHOD.POST,
    url: "upload/avatar",
    data: form,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const GET_AUTH = () => {
  return Api({
    method: METHOD.GET,
    url: "auth",
  });
};
