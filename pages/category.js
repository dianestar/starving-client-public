import React, { useState, useEffect, useCallback } from "react";
import Layout from "../components/Layout";
import RecipeCard from "../components/RecipeCard";
import { GET_CATEGORY_RECIPE } from "../_axios/recipe";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";

const Category = () => {
  const router = useRouter();
  const categoryName = router.query.categoryName;
  const [recipes, setRecipes] = useState([]);
  const [recipesCount, setRecipesCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);

  const getCategorizedRecipe = useCallback(async () => {
    try {
      const {
        data: { access, recipesCount, totalPages, recipes },
      } = await GET_CATEGORY_RECIPE(page, 4, categoryName);

      if (access) {
        setRecipes(recipes);
        setRecipesCount(recipesCount);
        setPageCount(totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  }, [categoryName, page]);

  const handlePageClick = (event) => {
    // console.log(event);
    setPage(event.selected + 1);
  };

  useEffect(() => {
    getCategorizedRecipe();
  }, [getCategorizedRecipe]);

  return (
    <>
      <Layout>
        <section className="w-[1060px] space-y-8 my-16 mx-auto">
          <p className="text-2xl font-bold">#{categoryName}</p>
          <p className="text-3xl font-bold">
            조건에 맞는 레시피가{" "}
            <span className="text-cyan-600">{recipesCount}</span>개 있습니다.
          </p>
          <article className="w-[1060px] flex justify-between mx-auto my-4">
            {recipes.map((recipe, index) => (
              <RecipeCard
                key={index}
                percent="1.5"
                nickname={recipe.owner?.nickname}
                desc={recipe.description}
                title={recipe.title}
                time="30분"
                like="702명"
                avatarImage={recipe.owner?.avatarImage}
                cookImages={recipe.cookImages}
              />
            ))}
          </article>
          <ReactPaginate
            className="flex justify-center space-x-4"
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          ></ReactPaginate>
        </section>
      </Layout>
    </>
  );
};

export default Category;
