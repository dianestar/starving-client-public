import React from "react";

const ImageUpload = ({ onLoadFile, handleDeleteImage, showImages }) => {
  return (
    <section className="mt-3">
      <article>
        <p className="mb-2 text-xs text-red-500">
          저용량 JPG/JPEG만 올려주세요.(용량이 많을 경우 업로드가 안될 수
          있습니다.)
        </p>
        <label
          htmlFor="cookImages"
          className="w-[160px] flex mr-4 py-2 px-3 text-sm text-sky-600 cursor-pointer
          rounded-full border border-sky-600 items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
          조리과정 추가하기
        </label>
        <input
          type="file"
          multiple
          onChange={onLoadFile}
          accept="image/jpg, image/jpeg,"
          id="cookImages"
          className="hidden"
        />
      </article>

      <article className="flex mt-3">
        {showImages.map((image, id) => (
          <div key={id} className="mr-4">
            <p
              onClick={() => {
                handleDeleteImage(id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-rose-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </p>

            <img
              src={image}
              alt={`${image}-${id}`}
              className="w-[200px] h-auto"
            />
          </div>
        ))}
      </article>
    </section>
  );
};

export default ImageUpload;
