import Head from "next/head";
import React from "react";
import Layout from "../components/Layout";

const myrecipe = () => {
  return (
    <>
      <Head>
        <title>해먹남녀 | 레시피</title>
      </Head>
      <Layout>
        <section className="w-[1060px] mx-auto">
          <section className="mt-20">
            <div className="flex">
              <h2 className="mb-14 text-gray-700 font-semibold text-2xl mr-auto">
                레시피 등록하기
              </h2>
            </div>
          </section>

          <div className="text-center my-3">
            <button className="px-10 py-3 rounded font-medium text-white bg-sky-600">
              등록완료
            </button>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default myrecipe;
