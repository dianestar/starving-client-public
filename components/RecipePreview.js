import React from "react";
import RecipeCard from "../components/RecipeCard";

const arr = Array(4).fill("0");

const RecipePreview = () => {
    return (
        <div className="w-[50vw] flex justify-between mx-auto my-4">
            {arr.map((v, i) => (<RecipeCard key={i} percent="1.5" nickname="제이소다" desc="부대찌개 맛있게 끓이는법~" title="부대찌개" time="30분" like="702명" />))}
        </div>
    );
}

export default RecipePreview;