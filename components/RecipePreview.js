import React, { useCallback, useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import { GET_ALL_RECIPE } from "../_axios/recipe";

const RecipePreview = () => {
  const [recipes, setRecipes] = useState([]);

  const getRecipeAll = async () => {
    const {
      data: { access, recipes },
    } = await GET_ALL_RECIPE(1, 8);
    if (access) {
      setRecipes(recipes);
    }
  };

  useEffect(() => {
    getRecipeAll();
  }, []);

  return (
    <>
      <div className="w-[1060px] grid grid-rows-2 grid-cols-4">
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={recipe.pk}
            pk={recipe.pk}
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
      </div>
    </>
  );
};

export default RecipePreview;
