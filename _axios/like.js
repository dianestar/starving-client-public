import Api, { METHOD } from "./interceptor";

export const POST_LIKE = (form) => {
    return Api({
      method: METHOD.POST,
      url: "like",
      data: form,
    });
};

export const DELETE_LIKE = (form) => {
    return Api({
        method: METHOD.DELETE,
        url: "like",
        data: form,
    })
}