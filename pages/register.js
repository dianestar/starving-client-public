import { useState, useRef } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import FormWrapper from "../components/FormWrapper";
import FormButton from "../components/FormButton";
import { useForm } from "react-hook-form";
import FormBg from "../components/FormBg";
import router from "next/router";
import axios from "axios";

function Register() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async () => {
    const res = await axios.post("http://3.38.33.154:9999/api/auth/register", {
      email: watch("email"),
      password: watch("password"),
      nickname: watch("nickname"),
    });
    if (res.status === 200 || res.status === 201) {
      alert("회원가입이 완료되었습니다.");
      router.push("/login");
    } else {
      console.log(res);
    }
    console.log(res);
    return res;
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
            <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="email"></label>
              <input
                name="email"
                className="w-3/4 px-4 py-3"
                placeholder="이메일주소"
                {...register("email", {
                  required: true,
                  pattern:
                    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                })}
              />
              {errors.email && (
                <p className="text-cyan-600">이메일 형식을 지켜주세요</p>
              )}

              <label htmlFor="nickname"></label>
              <input
                name="nickname"
                type="name"
                className="w-3/4 px-4 py-3 mt-3"
                placeholder="이름"
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
