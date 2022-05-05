import React from "react";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import router from "next/router";

const SearchRecipeInput = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { register, watch, handleSubmit, reset } = useForm({
    mode: "onChange",
  });

  const onSubmit = async () => {
    if (watch("search") === "") {
      enqueueSnackbar("검색어를 입력해주세요", {
        variant: "error",
      });
    } else if (watch("search")) {
      await router.push(`/search/${watch("search")}`);
      reset();
    }
  };

  return (
    <form className="mt-2 flex items-center" onSubmit={handleSubmit(onSubmit)}>
      <input
        className="w-[350px] h-[30px] rounded px-2 text-xs"
        type="text"
        name="search"
        placeholder="음식명, 재료명으로 검색해주세요."
        {...register("search")}
      ></input>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 relative right-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="gray"
        strokeWidth={2}
        onClick={handleSubmit(onSubmit)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </form>
  );
};

export default SearchRecipeInput;
