import React, { useState } from "react";
import { useRouter } from "next/router";
import FormWrapper from "./FormWrapper";
import axios from "axios";
import FormButton from "./FormButton";

const LoginForm = () => {
    const router = useRouter();
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [emailWarning, setEmailWarning] = useState(false);
    const [passwordWarning, setPasswordWarning] = useState(false);

    const onChangeEmail = (e) => {
        if (emailInput !== "") {
            setEmailWarning(false);
        }
        setEmailInput(e.target.value);
    }
    
    const onChangePassword = (e) => {
        if (passwordInput !== "") {
            setPasswordWarning(false);
        }
        setPasswordInput(e.target.value);
    }

    const onKeyPress = (e) => {
        if (e.keyCode == 13) {
            loginForm.submit();
        }
    }

    const onClickLogin = (e) => {
        e.preventDefault();

        if (emailInput !== "" && passwordInput !== "") {
            handleDefaultLogin();
            return;
        }

        if (emailInput === "") {
            setEmailWarning(true);
        }
        if (passwordInput === "") {
            setPasswordWarning(true);
        }
    }

    const handleDefaultLogin = async () => {
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

    return (
        <>
            <FormWrapper title="로그인" text1="비밀번호 찾기" text2="회원 가입하기">
                <form className="w-full flex flex-col items-center space-y-4" name="loginForm" onSubmit={onClickLogin}>
                    <input className="w-3/4 h-12 pl-2" placeholder="이메일주소" onChange={onChangeEmail} onKeyPress={onKeyPress} />
                    { emailWarning && <span className="text-xs text-cyan-600">이메일 주소를 입력해주세요</span> }
                    <input className="w-3/4 h-12 pl-2" type="password" placeholder="비밀번호" onChange={onChangePassword} onKeyPress={onKeyPress} />
                    { passwordWarning && <span className="text-xs text-cyan-600">비밀번호를 입력해주세요</span> }
                    <FormButton desc="로그인"/>
                </form>
            </FormWrapper>
        </>
    );
}

export default LoginForm;