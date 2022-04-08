import router from "next/router";
import React from "React";

const category = [
  "편의점요리",
  "밑반찬",
  "면역력",
  "저칼로리",
  "키토제닉",
  "술안주",
  "고단백",
  "떡볶이",
  "초간단",
];

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <section className="w-full h-[45px] bg-cyan-400">
          <article className="w-2/3 h-full mx-auto py-auto flex justify-between">
            <section className="flex items-center">
              <input
                className="w-[350px] h-[30px] rounded px-2 text-xs"
                type="text"
                placeholder="음식명, 재료명으로 검색해주세요."
              ></input>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 relative right-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="gray"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </section>
            <section className="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 20 20"
                fill="white"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 20 20"
                fill="white"
                onClick={() => {
                  router.push("/register");
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </section>
          </article>
        </section>
        <section className="w-full h-[55px] bg-slate-100">
          <article className="w-2/3 h-full flex items-center justify-around mx-auto">
            <span className="text-2xl font-bold">해먹남녀</span>
            <section className="flex space-x-6">
              <a className="flex space-x-6 text-slate-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="gray"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>카테고리</span>
                <span>|</span>
              </a>
              {category.map((v) => (
                <span className="text-slate-400">{v}</span>
              ))}
            </section>
          </article>
        </section>
      </header>
      {children}
      <footer className="w-full h-[150px] bg-slate-100 flex items-center justify-center">
        I AM FOOTER :)
      </footer>
    </div>
  );
};

export default Layout;
