import React, { useCallback, useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { GET_ALL_RECIPE } from "../_axios/recipe";
import ReactPaginate from "react-paginate";

const RecipePreview = () => {
  const [recipes, setRecipes] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);

  const getRecipeAll = useCallback(async () => {
    const {
      data: { access, recipesCount, totalPages, recipes },
    } = await GET_ALL_RECIPE(page, 3);
    if (access) {
      setRecipes(recipes);
      setPageCount(totalPages);
    }
  }, [page]);

  useEffect(() => {
    getRecipeAll();
  }, [getRecipeAll]);

  const onPageChange = (count) => {
    const { selected } = count;
    setPage(selected + 1);
  };

  return (
    <>
      <div className="w-[1060px] flex justify-between mx-auto my-4">
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            percent="1.5"
            nickname={recipe.owner.nickname}
            desc={recipe.description}
            title={recipe.title}
            time="30분"
            like="702명"
            avatarImage={recipe.owner.avatarImage}
          />
        ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={onPageChange}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName={"pagination"}
      />
    </>
  );
};

export default RecipePreview;
