import Api from "./interceptor";

const METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

export const REGISTER = (form) => {
  return Api({
    method: METHOD.POST,
    url: "auth/register",
    data: form,
  })
}

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
    url: "auth/update",
    data: form,
  });
};

export const UPLOAD_AVATAR = (form) => {
  return Api({
    method: METHOD.POST,
    url: "upload/avatar",
    data: form,
    headers: {"Content-Type": "multipart/form-data"},
  });
};