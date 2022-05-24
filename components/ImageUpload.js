const ImageUpload = ({ onLoadFile, imageInputRef }) => {
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
          rounded-full border border-sky-600 items-center mb-1"
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
          id="cookImages"
          multiple
          onChange={onLoadFile}
          accept="image/jpg, image/jpeg,"
          className="hidden"
          ref={imageInputRef}
        />
      </article>
    </section>
  );
};

export default ImageUpload;
