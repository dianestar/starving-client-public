import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  Fragment,
} from "react";
import Head from "next/head";
import { GET_AUTH } from "../_axios/user";
import { GET_ONE_RECIPE, DELETE_RECIPE } from "../_axios/recipe";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import Button from "@mui/material/Button";
import Layout from "../components/Layout";
import CommentArea from "../components/comment/CommentArea";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Detail = () => {
  const router = useRouter();
  const recipePk = router.query.recipePk;

  const [userPk, setUserPk] = useState(0);
  const [recipe, setRecipe] = useState({});
  const [owner, setOwner] = useState({});
  const [cookImages, setCookImages] = useState([]);
  const [category, setCategory] = useState("");

  const [isOwner, setIsOwner] = useState(false);

  const [navA, setNavA] = useState(null);
  const [navB, setNavB] = useState(null);
  const slickA = useRef(null);
  const slickB = useRef(null);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const checkOwner = useCallback(
    async (ownerPk) => {
      try {
        const {
          data: { pk },
        } = await GET_AUTH();

        if (pk) {
          setUserPk(pk);
          if (pk === ownerPk) setIsOwner(true);
          else setIsOwner(false);
        }
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  const getRecipeOne = useCallback(async () => {
    try {
      const {
        data: {
          access,
          recipe: {
            title,
            description,
            mainText,
            cookImages,
            updateAt,
            owner: { pk, nickname, avatarImage },
            category: { values },
          },
        },
      } = await GET_ONE_RECIPE(recipePk);

      if (access) {
        setRecipe({ title, description, mainText, updateAt });
        setCookImages(cookImages);
        if (avatarImage) {
          setOwner({ nickname, avatarImage });
        } else {
          setOwner({ nickname, avatarImage: "/defaultAvatarImage.png" });
        }
        setCategory(values);

        checkOwner(pk);
      }
    } catch (error) {
      console.log(error);
    }
  }, [recipePk, checkOwner]);

  const handleDeleteRecipe = async () => {
    try {
      const {
        data: { access, message },
      } = await DELETE_RECIPE(recipePk);

      if (access) {
        enqueueSnackbar("삭제되었습니다", { variant: "info" });
        await router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecipeOne();
    setNavA(slickA.current);
    setNavB(slickB.current);
  }, [getRecipeOne]);

  return (
    <>
      <Head>
        <title>STARVING | RECIPE</title>
      </Head>
      <Layout>
        <div className="w-full min-h-screen bg-slate-50">
          <section className="w-[1200px] mx-auto flex">
            <article className="w-3/4 min-h-screen bg-white mx-2 my-4 p-8 shadow-sm space-y-4">
              <section className="flex items-center justify-between">
                <p className="text-xl font-bold text-cyan-600">#{category}</p>  
                  {isOwner ? (
                  <div className="flex items-center">
                    <p
                      className="text-sm text-neutral-400 hover:text-neutral-800 hover:cursor-pointer"
                      onClick={async () => {
                        await router.push(`edit/${recipePk}`);
                      }}
                    >
                      수정
                    </p>
                    <span className="mx-1 text-sm text-neutral-400">|</span>
                    <p
                      className="text-sm text-neutral-400 hover:text-neutral-800 hover:cursor-pointer"
                      onClick={() => {
                        const action = (key) => (
                          <Fragment>
                            <Button
                              color="error"
                              onClick={() => {
                                closeSnackbar(key);
                              }}
                            >
                              취소
                            </Button>
                            <Button color="error" onClick={handleDeleteRecipe}>
                              확인
                            </Button>
                          </Fragment>
                        );

                        return enqueueSnackbar("삭제하시겠습니까?", {
                          variant: "warning",
                          action,
                        });
                      }}
                    >
                      삭제
                    </p>
                  </div>
                  ) : null}
              </section>
              <hr />
              <p className="text-3xl font-bold text-center break-all">
                {recipe.title}
              </p>
              <p className="text-lg text-center text-neutral-400 break-all">
                {recipe.description}
              </p>
              <hr />
              <Slider
                ref={slickA}
                asNavFor={navB}
                infinite={true}
                arrows={true}
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
              >
                {cookImages.map((v, i) => (
                  <div key={i}>
                    <img src={v} className="h-[500px] mx-auto" />
                  </div>
                ))}
              </Slider>
              {cookImages.length > 1 && (
                <Slider
                  className="hover:cursor-pointer"
                  ref={slickB}
                  asNavFor={navA}
                  slidesToShow={cookImages.length}
                  swipeToSlide={true}
                  focusOnSelect={true}
                >
                  {cookImages.map((v, i) => (
                    <div key={i}>
                      <img
                        src={v}
                        className="brightness-75 w-full h-[200px] object-cover"
                      />
                    </div>
                  ))}
                </Slider>
              )}
              <p className="text-md leading-8 break-all">{recipe.mainText}</p>
            </article>
            <article className="w-1/4 min-h-screen bg-sky-50 mx-2 my-4 p-4 shadow-sm space-y-4">
              <section className="flex flex-col items-center space-y-4">
                <img
                  className="w-[100px] h-[100px] rounded-full object-cover"
                  src={owner.avatarImage}
                />
                <p className="text-2xl font-bold text-cyan-600">
                  {owner.nickname}
                </p>
                <span className="font-bold text-sm text-neutral-400">{new Date(recipe.updateAt).toLocaleString("ko-KR")}</span>
              </section>
              <hr />
              <section>
                <CommentArea recipePk={recipePk}/>
              </section>
            </article>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default Detail;
