import React, { useState } from "react";
import FormWrapper from "./FormWrapper";
import KakaoLogin from "react-kakao-login";

const TOKEN = "dc9bce1a914ba5fe828942d564915e2b"

const LoginForm = () => {
    const [userInfo, setUserInfo] = useState({});

    return (
        <>
            <FormWrapper title="로그인" text1="비밀번호 찾기" text2="회원 가입하기">
                <input className="w-3/4 h-12 pl-2" placeholder="이메일주소" />
                <input className="w-3/4 h-12 pl-2" placeholder="비밀번호" />
            </FormWrapper>
            <KakaoLogin
                className="absolute top-[50vh] left-1/2 right-1/2 translate-x-[-50%]"
                token={TOKEN}
                onSuccess={(response) => {
                    console.log(response);
                    setUserInfo(response);
                }}
                onFail={(error) => console.error("로그인 실패", error)}
                onLogout={() => console.log("로그아웃")}
            />
        </>
    );
}

export default LoginForm;