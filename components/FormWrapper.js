import React from "react";

const FormWrapper = ({ title, text1, link1, text2, link2, children }) => {
  return (
    <section className="w-[350px] mt-[100px] z-10">
      <article className="h-[60px] bg-white flex items-center justify-center text-lg font-bold">
        {title}
      </article>
      <article className="min-h-[260px] bg-neutral-200 flex flex-col items-center space-y-4 py-8">
        {children}
        <section className="text-neutral-600">
          <a>{text1}</a>
          <span> / </span>
          <a>{text2}</a>
        </section>
      </article>
    </section>
  );
};

export default FormWrapper;
