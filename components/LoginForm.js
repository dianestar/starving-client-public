import React, { useState } from "react";
import { useRouter } from "next/router";
import FormWrapper from "./FormWrapper";
import KakaoLogin from "react-kakao-login";
import axios from "axios";
import FormButton from "./FormButton";

const TOKEN = "dc9bce1a914ba5fe828942d564915e2b"

/* 폼으로 바꾸고 빈 입력 유효성 검사 추가할 것 */
const LoginForm = () => {
    const router = useRouter();
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const onChangeEmail = (e) => {
        setEmailInput(e.target.value);
    }
    
    const onChangePassword = (e) => {
        setPasswordInput(e.target.value);
    }

    const onLogin = async () => {
        try {
            const response = await axios.post("http://3.38.33.154:9999/api/auth/login", {
                "email": emailInput,
                "password": passwordInput
            })
            console.log(response);
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleSuccess = async (res) => {
        console.log(res);
        try {
            const response = await axios.post("http://3.38.33.154:9999/api/auth/register", {
                "email": res.profile.kakao_account.email,
                "password": res.profile.id,
                "nickname": res.profile.kakao_account.profile.nickname,
                "avatarImage": res.profile.kakao_account.profile.profile_image_url,
                "social": "KAKAO"
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <FormWrapper title="로그인" text1="비밀번호 찾기" text2="회원 가입하기">
                <input className="w-3/4 h-12 pl-2" placeholder="이메일주소" onChange={onChangeEmail} />
                <input className="w-3/4 h-12 pl-2" type="password" placeholder="비밀번호" onChange={onChangePassword} />
                <FormButton desc="로그인" onClick={onLogin}/>
            </FormWrapper>
            <KakaoLogin
                className="relative bottom-[40vh] left-1/2 right-1/2 translate-x-[-50%]"
                token={TOKEN}
                onSuccess={handleSuccess}
                onFail={(error) => console.error("로그인 실패", error)}
                onLogout={() => console.log("로그아웃")}
            />
        </>
    );
}

export default LoginForm;