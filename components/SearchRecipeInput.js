import { useFormContext } from "react-hook-form";
import router from "next/router";

const SearchRecipeInput = ({
  onSubmit,
  keyword,
  searchList,
  setSearchList,
  searchListRef,
}) => {
  const { register } = useFormContext({
    mode: "onChange",
  });

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="mt-2 flex flex-col relative"
        ref={searchListRef}
      >
        <div className="flex items-center">
          <input
            className="w-[350px] h-[30px] rounded px-2 text-xs relative"
            type="text"
            name="search"
            placeholder="음식명, 재료명으로 검색해주세요."
            {...register("search")}
            autoComplete="off"
            onClick={() => setSearchList(!searchList)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 absolute right-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="gray"
            strokeWidth={2}
            onClick={onSubmit}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {searchList && (
          <ul className="px-3 bg-white border-solid border border-slate-300 overflow-y-auto h-28 z-10">
            {keyword.map((word) => (
              <li
                key={word.pk}
                className="text-sm py-1 hover:fill-slate-600 hover:cursor-pointer"
                onClick={() => {
                  router.push(`/search/${word.title}`);
                }}
              >
                {word.title}
              </li>
            ))}
          </ul>
        )}
      </form>
    </>
  );
};

export default SearchRecipeInput;
