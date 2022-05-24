import React, { useState, useEffect, useCallback } from "react";
import CustomizedPaginate from "../../components/CustomizedPaginate";
import Layout from "../../components/Layout";
import RecipeCard from "../../components/RecipeCard";
import { GET_SEARCH_RECIPE } from "../../_axios/recipe";
import Head from "next/head";

export async function getServerSideProps(context) {
  const searchKeyword = context.query.searchrecipe;

  return {
    props: { searchKeyword },
  };
}

const searchrecipe = ({ searchKeyword }) => {
  const [search, setSearch] = useState([]);
  const [recipesCount, setRecipesCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const getSearch = useCallback(async () => {
    const size = 8;
    try {
      const {
        data: { totalCount, totalPages, recipes },
      } = await GET_SEARCH_RECIPE(page, size, searchKeyword);

      setRecipesCount(totalCount);
      setPageCount(totalPages);
      setSearch(recipes);
    } catch (e) {
      console.log(e);
    }
  }, [page, searchKeyword]);

  useEffect(() => {
    getSearch();
  }, [searchKeyword]);

  return (
    <>
      <Head>
        <title>STARVING | 레시피</title>
      </Head>
      <Layout>
        <div className="w-full min-h-screen bg-slate-50">
          <section className="w-[1060px] space-y-8 py-16 mx-auto">
            <p className="text-3xl font-bold">
              조건에 맞는 레시피가{" "}
              <span className="text-cyan-600">{recipesCount}</span>개 있습니다.
            </p>
            <article className="w-[1060px] grid grid-rows-2 grid-cols-4 mx-auto my-4">
              {search.map((recipe) => (
                <RecipeCard
                  key={recipe.pk}
                  pk={recipe.pk}
                  nickname={recipe.owner.nickname}
                  desc={recipe.description}
                  title={recipe.title}
                  likesCount={recipe.likesCount}
                  avatarImage={recipe.owner.avatarImage}
                  cookImages={recipe.cookImages}
                />
              ))}
            </article>
            <CustomizedPaginate
              setPage={setPage}
              pageCount={pageCount}
              pageRangeDisplayed={10}
            />
          </section>
        </div>
      </Layout>
    </>
  );
};

export default searchrecipe;
