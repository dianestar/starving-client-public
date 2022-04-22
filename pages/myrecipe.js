import Head from "next/head";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { UPLOAD_RECIPE } from "../_axios/recipe";
import FormErrorMessage from "../components/error/FormErrorMessage";
import ImageUpload from "../components/ImageUpload";
import { useState, useRef } from "react";
import { useSnackbar } from "notistack";

const Myrecipe = () => {
  // 방금 선택한 사진을 바로 삭제한 경우 input ref를 비워주기 위해 useRef 활용
  // ImageUpload 컴포넌트에 props로 넘김
  const imageInputRef = useRef();
  const [showImages, setShowImages] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const categories = ["RICE", "SOUP", "BREAD", "NOODLE", "FRIED"];
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  const onSubmit = async () => {
    const form = new FormData();
    form.append("title", watch("title"));
    form.append("description", watch("description"));
    form.append("mainText", watch("mainText"));
    showImages.forEach((image) => {
      form.append("cookImages", image.file);
    })

    form.append("category", watch("category"));

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
    // cf. showImages, saveImages 그냥 하나로 합침
    const imageList = e.target.files;
    let tempList = [...showImages];

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

    setShowImages(tempList);
  };

  const handleDeleteImage = (url) => {
    // cf. url 기준 필터링으로 수정
    setShowImages(showImages.filter((image) => image.url !== url));
    // createObjectURL로부터 생성된 URL 해제
    URL.revokeObjectURL(url);
    // input ref 비우기
    imageInputRef.current.value = "";
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
              <h2 className="mb-10 text-gray-700 font-semibold text-2xl mr-auto">
                레시피 등록하기
              </h2>
            </div>
          </article>

          <section className="space-y-8 my-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              <article>
                <div className="w-full flex items-center mb-4">
                  <label
                    className="mr-11 text-gray-700 font-bold text-xl"
                    htmlFor="title"
                  >
                    레시피 제목
                  </label>
                  <input
                    className="w-3/4 h-12 px-4 border-2 rounded"
                    placeholder="레시피의 제목을 입력해주세요"
                    {...register("title", { required: true })}
                  />
                  <div className="ml-3">
                    {errors.title && errors.title.type === "required" && (
                      <FormErrorMessage message={"제목을 입력해주세요"} />
                    )}
                  </div>
                </div>

                <div className="w-full flex items-center mb-4">
                  <label
                    className="mr-11 text-gray-700 font-bold text-xl"
                    htmlFor="description"
                  >
                    한줄설명
                  </label>
                  <input
                    className="w-3/4 h-12 px-4 border-2 rounded"
                    placeholder="레시피를 소개할 수 있는 한줄설명을 입력해주세요"
                    {...register("description", { required: true })}
                  />

                  <div className="ml-3">
                    {errors.description &&
                      errors.description.type === "required" && (
                        <FormErrorMessage message={"한줄설명을 입력해주세요"} />
                      )}
                  </div>
                </div>

                <div className="w-full flex items-center mb-4">
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
                          checked={v === watch("category")}
                          {...register("category", { required: true })}
                        />
                        <label htmlFor={v}>{v}</label>
                      </article>
                    ))}
                    <div className="ml-3">
                      {errors.category &&
                        errors.category.type === "required" && (
                          <FormErrorMessage
                            message={"카테고리를 선택해주세요"}
                          />
                        )}
                    </div>
                  </section>
                </div>
              </article>

              <textarea
                placeholder="조리 방법을 입력해주세요 🍳"
                className="w-full h-[250px] px-2 py-2 resize-none border-2 rounded-md"
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
                showImages={showImages}
                imageInputRef={imageInputRef}
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
          </section>
        </section>
      </Layout>
    </>
  );
};

export default Myrecipe;
