import { useRef } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import FormWrapper from "../components/FormWrapper";
import FormButton from "../components/FormButton";
import { useForm } from "react-hook-form";
import FormBg from "../components/FormBg";
import router from "next/router";
import { REGISTER } from "../_axios/user";

function Register() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async () => {
    const form = {
      email: watch("email"),
      password: watch("password"),
      nickname: watch("nickname"),
    };

    try {
      const {
        data: { access, message },
      } = await REGISTER(form);

      if (!access) {
        alert(message);
      } else {
        alert("회원가입이 완료되었습니다");
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>해먹남녀 | STARVING</title>
      </Head>
      <Layout>
        <FormBg>
          <FormWrapper
            title="회원가입"
            text1="로그인"
            text2="약관 보기"
            link1="/login"
            link2="/"
          >
            <form
              className="w-full flex flex-col items-center text-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label htmlFor="email"></label>
              <input
                name="email"
                className="w-3/4 px-4 py-3"
                placeholder="이메일주소"
                {...register("email", {
                  required: true,
                  pattern: {
                    value:
                      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                    message: "이메일을 입력해 주세요",
                  },
                })}
              />
              {errors.email && errors.email.message && (
                <p className="text-cyan-600">{errors.email.message}</p>
              )}

              <label htmlFor="nickname"></label>
              <input
                name="nickname"
                type="name"
                className="w-3/4 px-4 py-3 mt-3"
                placeholder="닉네임"
                {...register("nickname", { required: true, maxLength: 10 })}
              />
              {errors.nickname && errors.nickname.type === "required" && (
                <p className="text-cyan-600">이름을 입력해주세요</p>
              )}
              {errors.nickname && errors.nickname.type === "maxLength" && (
                <p className="text-cyan-600">
                  이름은 10자리를 넘길 수 없습니다.
                </p>
              )}

              <label htmlFor="password"></label>
              <input
                name="password"
                type="password"
                className="w-3/4 px-4 py-3 mt-3"
                placeholder="비밀번호(8자 이상)"
                {...register("password", { required: true, minLength: 8 })}
              />
              {errors.password && errors.password.type === "required" && (
                <p className="text-cyan-600">비밀번호를 입력해주세요</p>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <p className="text-cyan-600">비밀번호는 최소 8자리 입니다</p>
              )}

              <label htmlFor="password_confirm"></label>
              <input
                name="password_confirm"
                type="password"
                className="w-3/4 px-4 py-3 mt-3 mb-3"
                placeholder="비밀번호 확인"
                {...register("password_confirm", {
                  required: true,
                  validate: (value) => value === password.current,
                })}
              />

              {errors.password_confirm &&
                errors.password_confirm.type === "required" && (
                  <p className="text-cyan-600">
                    비밀번호를 한번 더 입력해주세요
                  </p>
                )}

              {errors.password_confirm &&
                errors.password_confirm.type === "validate" && (
                  <p className="text-cyan-600">비밀번호가 일치하지 않습니다</p>
                )}

              <FormButton desc="회원가입" />
            </form>
          </FormWrapper>
        </FormBg>
      </Layout>
    </>
  );
}

export default Register;
