import Api from "./interceptor";

const METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const LOGIN = (form) => {
  return Api({
    method: METHOD.POST,
    url: "auth/login",
    data: form,
  });
};
