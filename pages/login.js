import React, { useState } from "react";
import { useRouter } from "next/router";
import  { LOGIN, REGISTER } from "../_axios/user";
import KakaoLogin from "react-kakao-login";
import Head from "next/head";
import Layout from "../components/Layout";
import FormBg from "../components/FormBg";
import FormWrapper from "../components/FormWrapper";
import FormButton from "../components/FormButton";

function Login() {
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

    // Input 유효성 검사
    const onSubmitLogin = (e) => {
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

    // 기본 로그인
    const handleDefaultLogin = async () => {
        const form = {
            email: emailInput,
            password: passwordInput,
        }

        try {    
            const {
                data: { access, error, token },
            } = await LOGIN(form);

             // 로그인 실패 시
            if (!access) {
                alert(error)
            }

            // 로그인 성공 시
            else {
                localStorage.setItem("access_token", token);
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        }
    }

    // 카카오 소셜 로그인
    const handleKakaoSuccess = async (res) => {
        const {
            profile: { id, kakao_account },
        } = res;

        const {
            email,
            profile: { nickname, profile_image_url },
        } = kakao_account;

        const form = {
            email,
            password: String(id),
            nickname,
            avatarImage: profile_image_url,
            social: "KAKAO",
        }

        try {
            const {
                data: { success }
            } = await REGISTER(form);

            // 최초 회원가입 시
            if (success === "Success register user account") {
                alert("축하합니다! 회원가입이 완료되었습니다.");
            }

            // 로그인 성공 시
            localStorage.setItem("access_token", token);
            router.push("/");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <Head>
            <title>해먹남녀 | STARVING</title>    
        </Head>
        <Layout>
            <FormBg>
                <FormWrapper title="로그인" text1="비밀번호 찾기" text2="회원 가입하기">
                    <form className="w-full flex flex-col items-center space-y-4" name="loginForm" onSubmit={onSubmitLogin}>
                        <input className="w-3/4 h-12 pl-2" placeholder="이메일주소" onChange={onChangeEmail} onKeyPress={onKeyPress} />
                        { emailWarning && <span className="text-xs text-cyan-600">이메일 주소를 입력해주세요</span> }
                        <input className="w-3/4 h-12 pl-2" type="password" placeholder="비밀번호" onChange={onChangePassword} onKeyPress={onKeyPress} />
                        { passwordWarning && <span className="text-xs text-cyan-600">비밀번호를 입력해주세요</span> }
                        <FormButton desc="로그인"/>
                    </form>
                </FormWrapper>
                <div className="flex flex-col">
                    <KakaoLogin
                        className="mt-8 z-10"
                        token={process.env.NEXT_PUBLIC_KAKAO_TOKEN}
                        onSuccess={handleKakaoSuccess}
                        onFail={(error) => console.error("로그인 실패", error)}
                        onLogout={() => console.log("로그아웃")}
                    />
                    {/*Naver Social Login */}
                </div>
            </FormBg>
        </Layout>
        </>
    );
}

export default Login;
