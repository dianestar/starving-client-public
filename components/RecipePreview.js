import React, { useCallback, useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

const RecipePreview = ({ recipes }) => {
  return (
    <>
      <div className="w-[1060px] grid grid-rows-1 grid-cols-4">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.pk}
            pk={recipe.pk}
            nickname={recipe.owner?.nickname}
            desc={recipe.description}
            title={recipe.title}
            likesCount={recipe.likesCount}
            avatarImage={recipe.owner?.avatarImage}
            cookImages={recipe.cookImages}
          />
        ))}
      </div>
    </>
  );
};

export default RecipePreview;
