import React from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import FormWrapper from "../components/FormWrapper";
import FormButton from "../components/FormButton";
import { useForm } from "react-hook-form";

function Register() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const onError = (err) => {
    console.log(err);
  };

  return (
    <>
      <Head>
        <title>해먹남녀 | STARVING</title>
      </Head>
      <Layout>
        <FormWrapper title="회원가입" text1="로그인" text2="약관 보기">
          <form
            className="text-center"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <input
              name="email"
              className="w-3/4 px-4 py-3"
              placeholder="이메일주소"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />

            {errors.email && (
              <p className="text-red-400 ">이메일 형식을 지켜주세요!</p>
            )}

            <input
              className="w-3/4 px-4 py-3 mt-3"
              placeholder="이름"
              {...register("이름")}
            />

            <input
              type="password"
              className="w-3/4 px-4 py-3 mt-3"
              placeholder="비밀번호(8자 이상)"
              {...register("비밀번호(8자 이상)")}
            />

            <input
              type="password"
              className="w-3/4 px-4 py-3 mt-3"
              placeholder="비밀번호 확인"
              {...register("비밀번호 확인")}
            />
            <FormButton desc="회원가입" />
          </form>
        </FormWrapper>
      </Layout>
    </>
  );
}

export default Register;
