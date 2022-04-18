import React from "react";
import { useForm } from "react-hook-form";
import { UPDATE } from "../../_axios/user";
import { useRouter } from "next/router";
import FormErrorMessage from "../error/FormErrorMessage";
import { useSnackbar } from "notistack";

function ProfileUpdateForm() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    getValues,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async () => {
    if (!getValues().nickname && !getValues().password) {
      enqueueSnackbar("닉네임이나 비밀번호 중 하나를 변경해주세요", {
        variant: "info",
      });
      return;
    }
    const { confirmPassword, ...form } = getValues();
    const {
      data: { access, message, user },
    } = await UPDATE(form);
    if (!access) {
      enqueueSnackbar(message, { variant: "error" });
      return;
    }
    window.localStorage.removeItem("access_token");
    await router.push("/login");
    return enqueueSnackbar(message, { variant: "success" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="flex justify-between mb-6">
        <label>
          <h2 className="mb-2 text-sm text-blue-400">이름</h2>
          <input
            {...register("nickname", {
              required: false,
              pattern: {
                value: /^[A-za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,12}$/,
                message: "닉네임은 2자리 이상 12자리 이하입니다.",
              },
            })}
            type="text"
            name="nickname"
            placeholder="닉네임"
            autoComplete="off"
            className="border-b"
          />
        </label>
        <section>
          {errors.nickname && errors.nickname.message && (
            <FormErrorMessage message={errors.nickname.message} />
          )}
        </section>

        <label>
          <h2 className="mb-2 text-sm text-blue-400">비밀번호</h2>
          <input
            {...register("password", {
              required: false,
              pattern: {
                value: /(?=.*\d)(?=.*[a-z]).{8,}/,
                message: "비밀번호는 영문 숫자 조합의 8자리 이상입니다.",
              },
            })}
            type="password"
            name="password"
            placeholder="비밀번호"
            className="border-b"
          />
        </label>
        <section>
          {errors.password && errors.password.message && (
            <FormErrorMessage message={errors.password.message} />
          )}
        </section>

        <label>
          <h2 className="mb-2 text-sm text-blue-400">비밀번호 확인</h2>
          <input
            {...register("confirmPassword", {
              validate: (v) =>
                v === watch("password") || "비밀번호가 일치하지 않습니다.",
            })}
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            className="border-b"
          />
        </label>
        <section>
          {errors.confirmPassword && errors.confirmPassword.message && (
            <FormErrorMessage message={errors.confirmPassword.message} />
          )}
        </section>
      </section>

      <section>
        <button
          type="submit"
          className="px-5 py-1 rounded font-medium text-white bg-sky-600"
        >
          변경
        </button>
      </section>
    </form>
  );
}

export default ProfileUpdateForm;
