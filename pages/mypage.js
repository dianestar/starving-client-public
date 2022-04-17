import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GET_AUTH } from "../_axios/user";
import AvatarImage from "../components/form/AvatarImage";
import Head from "next/head";
import Layout from "../components/Layout";
import NoContent from "../components/NoContent";
import RecipePreview from "../components/RecipePreview";
import UpdataUserForm from "../components/form/UpdateUserForm";

const Mypage = () => {
  const router = useRouter();
  const currentUrl = router.asPath;

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");

  const getAuth = async () => {
    const res = await GET_AUTH();

    if (!res) {
      router.push(`/login/?returnUrl=${currentUrl}`);
    } else {
      setNickname(res.data.nickname);
      setEmail(res.data.email);
    }
  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <>
      <Head>
        <title>해먹남녀 | 마이페이지</title>
      </Head>
      <Layout>
        <section className="w-[1060px] mx-auto">
          <section className="mt-20">
            <h2 className="mb-14 text-gray-700 font-semibold text-2xl">
              마이페이지
            </h2>

            <section className="flex border-solid border-t-2 border-gray-500 bg-sky-50">
              <article className="flex flex-col items-center basis-1/4 px-5 pt-5 pb-12 border-solid border border-gray-200">
                <AvatarImage nickname={nickname} />
              </article>

              <article className="flex flex-col justify-center pl-5 basis-3/4 border-solid border-r border-b border-gray-200">
                <div>
                  <h3 className="text-sm text-blue-400">이름</h3>
                  <p className="text-gray-700">{nickname}</p>
                </div>
                <div className="mt-2">
                  <h3 className="text-sm text-blue-400">E-mail</h3>
                  <p className="text-gray-700">{email}</p>
                </div>
              </article>
            </section>
          </section>

          <section className="my-20">
            <h2 className="mb-14 text-gray-700 font-semibold text-2xl">
              회원정보수정
            </h2>

            <section className="flex py-6 px-5 border-solid border border-gray-200">
              <article className="w-full">
                <UpdataUserForm />
              </article>
            </section>
          </section>

          <section className="my-20">
            <h2 className="mb-14 text-gray-700 font-semibold text-2xl">
              마이레시피
            </h2>

            <section>
              <article>
                <NoContent text={`아직 등록하신 레시피가 없습니다`} />
                {/* <RecipePreview /> */}
              </article>
            </section>
          </section>
        </section>
      </Layout>
    </>
  );
};

export default Mypage;
