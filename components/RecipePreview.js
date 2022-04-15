import React, { useCallback, useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { GET_ALL_RECIPE } from "../_axios/recipe";

const arr = Array(4).fill("0");

const RecipePreview = () => {
  const [recipes, setRecipes] = useState([]);
  const getRecipeAll = useCallback(async () => {
    const {
      data: { access, recipesCount, totalPages, recipes },
    } = await GET_ALL_RECIPE(1, 2);
    if (access) {
      setRecipes((prev) => [...prev, ...recipes]);
    }
  }, []);

  useEffect(() => {
    getRecipeAll();
  }, [getRecipeAll]);

  return (
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
  );
};

export default RecipePreview;
