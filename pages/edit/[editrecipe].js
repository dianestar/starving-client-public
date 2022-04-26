import Head from "next/head";
import Layout from "../../components/Layout";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { GET_ONE_RECIPE, PATCH_RECIPE } from "../../_axios/recipe";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import FormErrorMessage from "../../components/error/FormErrorMessage";
import ImageUpload from "../../components/ImageUpload";
import DeleteBtn from "../../components/DeleteBtn";
import router from "next/router";

export async function getServerSideProps(context) {
  const editId = context.query.editrecipe;
  return {
    props: { editId },
  };
}

const editRecipe = ({ editId }) => {
  //const categories = ["RICE", "SOUP", "BREAD", "NOODLE", "FRIED"];
  const [recipe, setRecipe] = useState({});
  const [cookImages, setCookImages] = useState([]);
  const [category, setCategory] = useState("");
  const imageInputRef = useRef();
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onChange" });

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
            owner: { pk },
            category: { values },
          },
        },
      } = await GET_ONE_RECIPE(editId);

      if (access) {
        setRecipe({ title, description, mainText });
        setCategory(values);

        let cookImageUrl = [];

        for (let i = 0; i < cookImages.length; i++) {
          cookImageUrl.push({
            url: cookImages[i],
          });
        }

        setCookImages(cookImageUrl);
      }
    } catch (error) {
      console.log(error);
    }
  }, [editId]);

  useEffect(() => {
    getRecipeOne();
  }, []);

  const onSubmit = async () => {
    const form = new FormData();
    form.append("pk", editId);
    form.append("description", watch("description"));
    form.append("mainText", watch("mainText"));
    cookImages.forEach((image) => {
      console.log(image);
      if (image.file !== undefined) {
        form.append("cookImages", image.file);
      }
    });

    form.append("category", watch("category"));

    try {
      const {
        data: { access, message },
      } = await PATCH_RECIPE(form);

      if (cookImages.length <= 0) {
        return enqueueSnackbar("이미지는 최소 1장입니다.", {
          variant: "error",
        });
      }

      if (!access) {
        return enqueueSnackbar(message, { variant: "error" });
      } else {
        enqueueSnackbar("레시피 수정이 완료되었습니다.", {
          variant: "success",
        });
        await router.push({
          pathname: "/detail",
          query: { recipePk: editId },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onLoadFile = (e) => {
    const imageList = e.target.files;

    let tempList = [...cookImages];

    for (let i = 0; i < imageList.length; i++) {
      tempList.push({
        file: imageList[i],
        url: URL.createObjectURL(imageList[i]),
      });
    }

    if (tempList.length > 10) {
      tempList = tempList.slice(0, 10);
      enqueueSnackbar("이미지는 최대 10장입니다.", { variant: "error" });
    }

    setCookImages(tempList);
  };

  const handleChage = (e) => {
    setCategory(e.target.value);
  };

  const handleDeleteImage = (url) => {
    setCookImages(cookImages.filter((image) => image.url !== url));
    URL.revokeObjectURL(url);
    imageInputRef.current.value = "";
  };

  return (
    <>
      <Head>
        <title>STARVING | UPDATE RECIPE</title>
      </Head>
      <Layout>
        <section className="w-[1060px] mx-auto">
          <article className="mt-20">
            <div className="flex">
              <h2 className="mb-10 text-gray-700 font-semibold text-2xl mr-auto">
                레시피 수정하기
              </h2>
            </div>
          </article>
        </section>
        <section className="w-[1060px] mx-auto">
          <section className="space-y-8 my-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              <article>
                <div className="w-full flex items-center mb-4">
                  <label
                    className="mr-11 text-gray-700 font-bold text-xl"
                    htmlFor="description"
                  >
                    한줄설명
                  </label>
                  <input
                    className="w-3/4 h-12 px-4 border-2 rounded"
                    defaultValue={recipe.description}
                    {...register("description", { minLength: 5 })}
                  />
                  {errors.description &&
                    errors.description.type === "minLength" && (
                      <FormErrorMessage message={"최소 5글자입니다."} />
                    )}
                </div>

                {/* 카테고리를 수정할 때 추가되는 로직 */}
                {/* <div className="w-full flex items-center mb-4">
                  <label className="mr-11 text-gray-700 font-bold text-xl mb-4">
                    카테고리
                  </label>
                  <section className="w-3/4 flex space-x-4">
                    {categories.map((v, i) => (
                      <article key={i} className="space-x-2 font-bold">
                        <input
                          type="radio"
                          id={v}
                          value={v}
                          checked={v === category}
                          onChange={handleChage}
                        />
                        <label htmlFor={v}>{v}</label>
                      </article>
                    ))}
                  </section>
                </div> */}
              </article>

              <textarea
                className="w-full h-[250px] px-2 py-2 resize-none border-2 rounded-md"
                {...register("mainText", { minLength: 30 })}
                defaultValue={recipe.mainText}
              ></textarea>
              {errors.mainText && errors.mainText.type === "minLength" && (
                <FormErrorMessage message={"최소 30글자입니다."} />
              )}

              <ImageUpload
                onLoadFile={onLoadFile}
                handleDeleteImage={handleDeleteImage}
                imageInputRef={imageInputRef}
              />
              <article className="grid gap-2 grid-cols-5 grid-rows-2 mt-3">
                {cookImages.map((image, i) => (
                  <div key={image.url} className="mr-4">
                    <DeleteBtn
                      onClick={() => {
                        handleDeleteImage(image.url);
                      }}
                    />
                    <img
                      src={image.url}
                      alt={`${image.url}-${i}`}
                      className="w-[200px] h-auto"
                    />
                  </div>
                ))}
              </article>

              <div className="text-center my-3">
                <button className="px-10 py-3 rounded font-medium text-white bg-sky-600">
                  수정완료
                </button>
              </div>
            </form>
          </section>
        </section>
      </Layout>
    </>
  );
};

export default editRecipe;
