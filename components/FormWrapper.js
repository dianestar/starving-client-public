import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import KakaoLogin from "react-kakao-login";
import axios from "axios";

const TOKEN = "dc9bce1a914ba5fe828942d564915e2b"

const FormWrapper = ({ title, text1, link1, text2, link2, children }) => {
    const router = useRouter();
    const [isLoginPage, setIsLoginPage] = useState(false);

    useEffect(() => {
        if (new URL(window.location.href).pathname === "/login") {
            setIsLoginPage(true);
        }
    }, [])

    const handleSocialSuccess = async (res) => {
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
        }

        try {
            const response = await axios.post("http://3.38.33.154:9999/api/auth/register", form);
            console.log(response);
            router.push("/");

        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className="
            w-full h-screen flex flex-col items-center
            before:bg-[url('../sources/bg2.jpg')] before:bg-cover before:brightness-50 before:absolute before:top-[100px] before:left-0 before:right-0 before:bottom-0
        ">
            <section className="w-1/4 mt-20 z-10">
                <article className="h-12 bg-white flex items-center justify-center text-lg font-bold">
                    {title}
                </article>
                <article className="bg-neutral-200 flex flex-col items-center space-y-4 py-4">
                    {children}
                    <section className="text-neutral-600">
                        <a>{text1}</a>
                        <span> / </span>
                        <a>{text2}</a>
                    </section>
                </article>
            </section>
            {isLoginPage &&
            <KakaoLogin
                className="mt-4 z-10"
                token={TOKEN}
                onSuccess={handleSocialSuccess}
                onFail={(error) => console.error("로그인 실패", error)}
                onLogout={() => console.log("로그아웃")}
            />
            }
        </div>
    );
}

export default FormWrapper;