import React from "react";
import { useForm } from "react-hook-form";
import { UPDATE } from "../../_axios/user";
import { useRouter } from "next/router";
import FormErrorMessage from "../error/FormErrorMessage";

function ProfileUpdateForm() {
  const router = useRouter();

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
      window.alert("Please you enter nickname or password");
      return;
    }
    const { confirmPassword, ...form } = getValues();
    const {
      data: { access, message, user },
    } = await UPDATE(form);
    if (!access) {
      window.alert(message);
      return;
    }
    window.alert(message);
    console.log(user);
    window.localStorage.removeItem("access_token");
    await router.push("/login");
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
                value: /^[A-za-z0-9]{2,12}$/,
                message: "Please insert a valid nickname",
              },
            })}
            type="text"
            name="nickname"
            placeholder="이름"
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
                message: "Please insert a valid password",
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
                v === watch("password") || "The passwords do not match",
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
