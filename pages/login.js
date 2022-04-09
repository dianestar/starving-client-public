import React, { useEffect, useState } from "react";
import KakaoLogin from "react-kakao-login";
import NaverLogin from "react-naver-login";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../components/Layout";
import FormBg from "../components/FormBg";
import FormWrapper from "../components/FormWrapper";
import FormButton from "../components/FormButton";

const KAKAO_TOKEN = "dc9bce1a914ba5fe828942d564915e2b";

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
  };

  const onChangePassword = (e) => {
    if (passwordInput !== "") {
      setPasswordWarning(false);
    }
    setPasswordInput(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.keyCode == 13) {
      loginForm.submit();
    }
  };

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
  };

  // 기본 로그인
  const handleDefaultLogin = async () => {
    try {
      const response = await axios.post(
        "http://3.38.33.154:9999/api/auth/login",
        {
          email: emailInput,
          password: passwordInput,
        }
      );
      console.log(response);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  // 카카오 소셜 로그인
  const handleKakaoSuccess = async (res) => {
    console.log(res);

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
    };

    try {
      const response = await axios.post(
        "http://3.38.33.154:9999/api/auth/register",
        form
      );
      console.log(response);
      router.push("/");
    } catch (error) {
      console.log(error);
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
            title="로그인"
            text1="비밀번호 찾기"
            text2="회원 가입하기"
            link1="/"
            link2="/register"
          >
            <form
              className="w-full flex flex-col items-center space-y-4"
              name="loginForm"
              onSubmit={onSubmitLogin}
            >
              <input
                className="w-3/4 h-12 pl-2"
                placeholder="이메일주소"
                onChange={onChangeEmail}
                onKeyPress={onKeyPress}
              />
              {emailWarning && (
                <span className="text-xs text-cyan-600">
                  이메일 주소를 입력해주세요
                </span>
              )}
              <input
                className="w-3/4 h-12 pl-2"
                type="password"
                placeholder="비밀번호"
                onChange={onChangePassword}
                onKeyPress={onKeyPress}
              />
              {passwordWarning && (
                <span className="text-xs text-cyan-600">
                  비밀번호를 입력해주세요
                </span>
              )}
              <FormButton desc="로그인" />
            </form>
          </FormWrapper>

          <div className="flex flex-col z-10 cursor-pointer">
            <KakaoLogin
              className="mt-8"
              token={KAKAO_TOKEN}
              onSuccess={handleKakaoSuccess}
              onFail={(error) => console.error("로그인 실패", error)}
              onLogout={() => console.log("로그아웃")}
            />
            <NaverLogin
              clientId="xHsYc3c4HlvbuZ1gQZ9Z"
              callbackUrl="http://localhost:3000/"
              render={(props) => (
                <div
                  className="mt-4 px-3 py-3 rounded text-center text-white bg-green-500"
                  onClick={props.onClick}
                >
                  네이버로 로그인하기
                </div>
              )}
              onSuccess={(res) => console.log(res)}
              onFailure={(err) => console.error("로그인 실패", err)}
            />
          </div>
        </FormBg>
      </Layout>
    </>
  );
}

export default Login;
