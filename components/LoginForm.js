import React from "react";
import FormWrapper from "./FormWrapper";
import KakaoLogin from "react-kakao-login";

const LoginForm = () => {
    return (
        <>
            <FormWrapper title="로그인" text1="비밀번호 찾기" text2="회원 가입하기">
                <input className="w-3/4 h-12 pl-2" placeholder="이메일주소" />
                <input className="w-3/4 h-12 pl-2" placeholder="비밀번호" />
            </FormWrapper>
            {/*카카오로 로그인하기*/}
        </>
    );
}

export default LoginForm;