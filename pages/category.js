import React, { useState, useEffect, useCallback } from "react";
import Layout from "../components/Layout";
import RecipeCard from "../components/RecipeCard";
import CustomizedPaginate from "../components/CustomizedPaginate";
import { GET_ALL_RECIPE, GET_CATEGORY_RECIPE } from "../_axios/recipe";
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
            } = await GET_CATEGORY_RECIPE(page, 8, categoryName);

            if (access) {
                setRecipes(recipes);
                setRecipesCount(recipesCount);
                setPageCount(totalPages);
            }
        } catch (error) {
            console.log(error);
        }  
    }, [categoryName, page]);

    const getRecipeAll = useCallback(async () => {
        const {
          data: { access, recipesCount, totalPages, recipes },
        } = await GET_ALL_RECIPE(page, 8);
        if (access) {
          setRecipes(recipes);
          setRecipesCount(recipesCount);
          setPageCount(totalPages);
        }
      }, [page]);

    useEffect(() => {
        if (categoryName === "ALL") {
            getRecipeAll();
        }
        else {
            getCategorizedRecipe();
        }
    }, [getRecipeAll, getCategorizedRecipe]);

    return (
        <>
            <Layout>
                <section className="w-[1060px] space-y-8 my-16 mx-auto">
                    <p className="text-2xl font-bold">#{categoryName}</p>
                    <p className="text-3xl font-bold">조건에 맞는 레시피가 <span className="text-cyan-600">{recipesCount}</span>개 있습니다.</p>
                    <article className="w-[1060px] grid grid-rows-2 grid-cols-4 mx-auto my-4">
                        {recipes.map((recipe, index) => (
                            <RecipeCard
                                key={recipe.pk}
                                percent="1.5"
                                nickname={recipe.owner.nickname}
                                desc={recipe.description}
                                title={recipe.title}
                                time="30분"
                                like="702명"
                                avatarImage={recipe.owner.avatarImage}
                                cookImages={recipe.cookImages}
                            />
                        ))}
                    </article>
                    <CustomizedPaginate setPage={setPage} pageCount={pageCount} />
                </section>
            </Layout>
            
        </>
    );
}

export default Category;