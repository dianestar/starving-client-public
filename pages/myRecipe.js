import Head from "next/head";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { UPLOAD_RECIPE } from "../_axios/recipe";
import FormErrorMessage from "../components/error/FormErrorMessage";
import ImageUpload from "../components/ImageUpload";
import { useRecoilState } from "recoil";
import { showImagesState } from "../_recoil/state";
import { useState } from "react";

const Myrecipe = () => {
  const [showImages, setShowImages] = useRecoilState(showImagesState);
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  const onSubmit = async () => {
    const form = {
      title: title,
      description: description,
      mainText: watch("mainText"),
      cookImages: watch("cookImages"),
      category: category,
    };

    try {
      const {
        data: { access, message },
      } = await UPLOAD_RECIPE(form);

      if (!access) {
        alert(message);
      } else {
        alert("레시피 등록이 완료되었습니다.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onLoadFile = (e) => {
    const imageList = e.target.files;
    let imageUrlList = [...showImages];

    for (let i = 0; i < imageList.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageList[i]);
      imageUrlList.push(currentImageUrl);
    }

    if (imageUrlList.length > 10) {
      imageUrlList = imageUrlList.slice(0, 10);
      alert("이미지는 최대 10장입니다.");
    }

    setShowImages(imageUrlList);
  };

  const handleDeleteImage = (id) => {
    setShowImages(
      showImages.filter((_, index) => {
        index !== id;
      })
    );
  };

  return (
    <>
      <Head>
        <title>해먹남녀 | 레시피</title>
      </Head>
      <Layout>
        <section className="w-[1060px] mx-auto">
          <article className="mt-20">
            <div className="flex">
              <h2 className="mb-14 text-gray-700 font-semibold text-2xl mr-auto">
                레시피 등록하기
              </h2>
            </div>
          </article>

          <article>
            <form onSubmit={handleSubmit(onSubmit)}>
              <textarea
                placeholder="조리 방법을 입력해주세요 🍳"
                className="w-full h-[250px] px-2 py-2 resize-none border rounded-md"
                {...register("mainText", { required: true, minLength: 30 })}
              ></textarea>
              {errors.mainText && errors.mainText.type === "required" && (
                <FormErrorMessage message={"조리 방법을 입력해주세요"} />
              )}
              {errors.mainText && errors.mainText.type === "minLength" && (
                <FormErrorMessage message={"내용은 최소 30자입니다."} />
              )}

              <ImageUpload
                onLoadFile={onLoadFile}
                handleDeleteImage={handleDeleteImage}
              />
              {errors.cookImages && errors.cookImages.type === "required" && (
                <FormErrorMessage message={"최소 업로드 갯수는 1개입니다."} />
              )}
              {errors.cookImages && errors.cookImages.type === "maxLength" && (
                <FormErrorMessage message={"최대 업로드 갯수는 10개입니다."} />
              )}
              <div className="text-center my-3">
                <button className="px-10 py-3 rounded font-medium text-white bg-sky-600">
                  등록완료
                </button>
              </div>
            </form>
          </article>
        </section>
      </Layout>
    </>
  );
};

export default Myrecipe;
