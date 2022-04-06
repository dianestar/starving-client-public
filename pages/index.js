import React from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Slick from "../components/Slick";
import RecipePreview from "../components/RecipePreview";
import RecommendForm from "../components/RecommendForm";

function Home() {
  return (
    <>
      <Head>
        <title>해먹남녀 | STARVING</title>    
      </Head>
      <Layout>
        <div className="w-full h-screen mx-auto my-4 overflow-hidden">
          <Slick />
          <section>
            해머거들의 누적 레시피
            진짜 사용자가 만드는 진짜 레시피
          </section>
          <section>
            <RecipePreview />
            <RecipePreview /> 
          </section>
          <RecommendForm />
          <section>
              냉장고를 부탁해! 냉장고에 숨어 있는 재료롤 맛있는 요리를 만들어보세요.
              내가 가진 재료로 레시피 추천받기
          </section>
        </div>
      </Layout>
    </>
  );
}

export default Home;
