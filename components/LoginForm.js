import React from "react";
import FormWrapper from "./FormWrapper";
import FormButton from "./FormButton";

const LoginForm = () => {
  return (
    <FormWrapper title="로그인" text1="비밀번호 찾기" text2="회원 가입하기">
      <FormButton desc="로그인" />
    </FormWrapper>
  );
};

export default LoginForm;
