import React from "react";
import router from "next/router";

const FormWrapper = ({ title, text1, link1, text2, link2, children }) => {
  return (
    <section className="w-[350px] mt-[100px] z-10">
      <article className="h-[60px] bg-white flex items-center justify-center text-lg font-bold">
        {title}
      </article>
      <article className="min-h-[260px] bg-neutral-200 flex flex-col items-center space-y-4 py-8">
        {children}
        <section className="text-neutral-600">
          <p className="cursor-pointer">
            <span
              onClick={async () => {
                await router.push(`${link1}`);
              }}
            >
              {text1}
            </span>

            <span> / </span>

            <span
              onClick={async () => {
                await router.push(`${link2}`);
              }}
            >
              {text2}
            </span>
          </p>
        </section>
      </article>
    </section>
  );
};

export default FormWrapper;
