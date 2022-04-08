import React from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Slick from "../components/Slick";
import RecipePreview from "../components/RecipePreview";
import { FaCarrot } from "react-icons/fa";
import { GiCookingGlove } from "react-icons/gi";
import { IoRestaurantOutline } from "react-icons/io5";

const chefOfDay = Array(9).fill("0");

function Home() {
  return (
    <>
      <Head>
        <title>해먹남녀 | STARVING</title>    
      </Head>
      <Layout>
        <div className="w-full mx-auto my-4 overflow-hidden">
          <Slick />
          <section className="w-full h-[500px] py-12 flex flex-col items-center justify-between">
            <article className="flex flex-col items-center space-y-2">
              <span className="text-xl font-bold">해머거들의 누적 레시피</span>
              <span className="text-4xl font-bold">진짜 사용자가 만드는 진짜 레시피</span>
            </article>
            <article className="w-[700px] flex justify-between">
              <section className="flex flex-col items-center space-y-4">
                <article className="w-[100px] h-[100px] rounded-full bg-neutral-200 flex items-center justify-center">
                  <FaCarrot className="w-1/2 h-1/2 text-white" />
                </article>
                <span className="w-[200px] font-bold text-center">쉽고 다양한 맞춤형 검색</span>
              </section>
              <section className="flex flex-col items-center space-y-4">
                <article className="w-[100px] h-[100px] rounded-full bg-neutral-200 flex items-center justify-center">
                  <GiCookingGlove className="w-1/2 h-1/2 text-white" />
                </article>
                <span className="w-[200px] font-bold text-center">우리가 만드는 진짜 랭킹</span>
              </section>
              <section className="flex flex-col items-center space-y-4">
                <article className="w-[100px] h-[100px] rounded-full bg-neutral-200 flex items-center justify-center">
                  <IoRestaurantOutline className="w-1/2 h-1/2 text-white" />
                </article>
                <span className="w-[200px] font-bold text-center">건강한 레시피 스토리</span>
              </section>
            </article>
            <button className="w-[250px] h-12 rounded bg-cyan-400 text-white text-lg">시작하기</button>
          </section>
          <section className="w-full bg-cyan-50 flex flex-col items-center py-8 space-y-8">
            <article>
              <p className="text-lg text-neutral-400">초딩입맛 사로잡는</p>
              <p className="text-4xl font-bold text-cyan-600">비주얼 쩌는 요리들~</p>  
              <RecipePreview />
            </article>
            <article>
            <p className="text-lg text-neutral-400">먹어는 봤나~</p>
              <p className="text-4xl font-bold text-cyan-600">자취인, 한 그릇의 품격</p>
              <RecipePreview /> 
            </article>
          </section>
          {/*<RecommendForm />*/}
          <section className="w-full py-16 bg-neutral-600 flex flex-col items-center space-y-16">
            <article className="flex flex-col items-center space-y-4">
              <span className="text-white text-xl">요리 좀 할 줄 아는 당신! 해먹남녀들의 풍요로운 식탁을 위해 해머거가 되어주세요!</span>
              <button className="w-[250px] h-12 rounded border-solid border-2 border-white text-white text-lg">나만의 레시피 등록하기</button>
            </article>
            <article className="flex flex-col items-center space-y-8">
              <span className="text-4xl text-white font-bold">오늘의 해머거</span>
              <section className="flex space-x-4">
                {chefOfDay.map((v, i) => (
                  <div key={i} className="w-[100px] h-[100px] rounded-full bg-neutral-200"></div>
                ))}
              </section>
            </article>
            <article className="flex flex-col items-center space-y-8">
              <span className="text-4xl text-white font-bold">오늘의 베스트해먹셰프</span>
              <section className="flex space-x-4">
                {chefOfDay.map((v, i) => (
                    <div key={i} className="w-[100px] h-[100px] rounded-full bg-neutral-200"></div>
                ))}
              </section>
            </article>
          </section>
        </div>
      </Layout>
    </>
  );
}

export default Home;
