import Api from "./interceptor";

const METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
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
    url: "auth/update",
    data: form,
  });
};
