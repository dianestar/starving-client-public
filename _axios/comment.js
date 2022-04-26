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