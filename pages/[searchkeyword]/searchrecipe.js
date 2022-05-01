import React from "react";
import CustomizedPaginate from "../../components/CustomizedPaginate";
import Layout from "../../components/Layout";
import RecipeCard from "../../components/RecipeCard";

const searchrecipe = () => {
  return (
    <Layout>
      <section>
        <h2>{`조건에 맞는 레시피가 ${1}개 있습니다.`}</h2>
        {/* <RecipeCard /> */}

        {/* setPage={setPage} pageCount={pageCount} */}
        <CustomizedPaginate />
      </section>
    </Layout>
  );
};

export default searchrecipe;
