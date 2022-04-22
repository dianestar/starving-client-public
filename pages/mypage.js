import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { GET_AUTH, DELETE_AUTH } from "../_axios/user";
import { GET_MY_RECIPE } from "../_axios/recipe";
import AvatarImage from "../components/form/AvatarImage";
import Head from "next/head";
import Layout from "../components/Layout";
import NoContent from "../components/NoContent";
import RecipeCard from "../components/RecipeCard";
import UpdataUserForm from "../components/form/UpdateUserForm";
import { useSnackbar, Fragment, Button } from "notistack";
import ReactPaginate from "react-paginate";

const Mypage = () => {
  const router = useRouter();
  const currentUrl = router.asPath;

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const [page, setPage] = useState(1);
  const [recipes, setRecipes] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const getAuth = useCallback(async () => {
    const res = await GET_AUTH();

    if (!res) {
      await router.push(`/login/?returnUrl=${currentUrl}`);
    } else {
      setNickname(res.data.nickname);
      setEmail(res.data.email);
    }
  }, [currentUrl, router]);

  const getMyrecipePage = async () => {
    const SIZE = 4;
    try {
      const {
        data: { access, totalPages, recipes },
      } = await GET_MY_RECIPE(page, SIZE);

      if (access) {
        setRecipes(recipes);

        setPageCount(totalPages);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAuth();
    getMyrecipePage();
  }, [getAuth, page]);

  const logout = async () => {
    localStorage.removeItem("access_token");
    await router.push(`/login/?returnUrl=${currentUrl}`);
    return enqueueSnackbar("로그아웃", { variant: "info" });
  };

  const handleDeleteUser = async () => {
    try {
      const {
        data: { access },
      } = await DELETE_AUTH();

      if (access) {
        localStorage.removeItem("access_token");
        alert("회원탈퇴가 완료되었습니다.");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageClick = (e) => {
    setPage(e.selected + 1);
  };

  return (
    <>
      <Head>
        <title>해먹남녀 | 마이페이지</title>
      </Head>
      <Layout>
        <section className="w-[1060px] mx-auto">
          <section className="mt-20">
            <section className="flex">
              <h2 className="mb-14 text-gray-700 font-semibold text-2xl mr-auto">
                마이페이지
              </h2>
              <article className="space-x-2 text-gray-400">
                <button
                  onClick={() => {
                    const isConfirmed = confirm("탈퇴하시겠습니까?");
                    if (isConfirmed) {
                      handleDeleteUser();
                    }
                  }}
                >
                  회원탈퇴
                </button>
                <span>|</span>
                <button onClick={logout}>로그아웃</button>
              </article>
            </section>

            <section className="flex border-solid border-t-2 border-gray-500 bg-sky-50">
              <article className="flex flex-col items-center basis-1/4 px-5 pt-5 pb-12 border-solid border border-gray-200">
                <AvatarImage nickname={nickname} />
              </article>

              <article className="flex flex-col justify-center pl-5 basis-3/4 border-solid border-r border-b border-gray-200">
                <div>
                  <h3 className="text-sm text-blue-400">이름</h3>
                  <p className="text-gray-700">{nickname}</p>
                </div>
                <div className="mt-2">
                  <h3 className="text-sm text-blue-400">E-mail</h3>
                  <p className="text-gray-700">{email}</p>
                </div>
              </article>
            </section>
          </section>

          <section className="my-20">
            <h2 className="mb-14 text-gray-700 font-semibold text-2xl">
              회원정보수정
            </h2>

            <section className="flex py-6 px-5 border-solid border border-gray-200">
              <article className="w-full">
                <UpdataUserForm />
              </article>
            </section>
          </section>

          <section className="my-20">
            <h2 className="mb-14 text-gray-700 font-semibold text-2xl">
              마이레시피
            </h2>

            <section>
              <article>
                {recipes.length !== 0 ? (
                  <div>
                    <div className="flex">
                      {recipes.map((recipe) => (
                        <RecipeCard
                          key={recipe.category.pk}
                          percent="5.0"
                          nickname={nickname}
                          desc={recipe.description}
                          title={recipe.title}
                          time="⏰"
                          like="♾"
                          avatarImage={"/defaultAvatarImage.png"}
                          cookImages={recipe.cookImages}
                        />
                      ))}
                    </div>
                    <ReactPaginate
                      className="flex justify-center space-x-4 mt-3"
                      breakLabel="..."
                      nextLabel="next >"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={5}
                      pageCount={pageCount}
                      previousLabel="< previous"
                      renderOnZeroPageCount={null}
                    ></ReactPaginate>
                  </div>
                ) : (
                  <NoContent text={`아직 등록하신 레시피가 없습니다`} />
                )}
              </article>
            </section>
          </section>
        </section>
      </Layout>
    </>
  );
};

export default Mypage;
