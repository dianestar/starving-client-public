import React from "react";
import FormButton from "./FormButton";

const LoginWrapper = ({ title, text1, link1, text2, link2, children }) => {
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
                    <FormButton desc="로그인"/>
                    <section className="text-neutral-600">
                        <a>{text1}</a>
                        <span> / </span>
                        <a>{text2}</a>
                    </section>
                </article>
            </section>
        </div>
    );
}

export default LoginWrapper;