import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GET_AUTH } from "../_axios/user";
import { useRouter } from "next/router";
import SearchRecipeInput from "./SearchRecipeInput";

const category = ["ALL", "RICE", "SOUP", "BREAD", "NOODLE", "FRIED"];

const Layout = ({ children }) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  const getAuth = async () => {
    const res = await GET_AUTH();

    if (!res) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <div>
      <header>
        <section className="w-full h-[45px] bg-cyan-400">
          <article className="w-2/3 h-full mx-auto py-auto flex justify-between">
            <section>
              <SearchRecipeInput />
            </section>
            <section className="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 hover:fill-slate-400 hover:cursor-pointer"
                viewBox="0 0 20 20"
                fill="white"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  clipRule="evenodd"
                />
              </svg>
              <Link href={isLogin ? "/reciperegister" : "/login"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 hover:stroke-slate-400 hover:cursor-pointer"
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
              </Link>
              <Link href={isLogin ? "/mypage" : "/login"} passHref>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 hover:fill-slate-400 hover:cursor-pointer"
                  viewBox="0 0 20 20"
                  fill="white"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </section>
          </article>
        </section>
        <section className="w-full h-[55px] bg-white">
          <article className="w-2/3 h-full flex items-center mx-auto">
            <span
              onClick={async () => await router.push("/")}
              className="text-2xl font-bold cursor-pointer"
            >
              STARVING 🍳
            </span>
            <section className="flex w-1/2 justify-between mx-auto">
              {category.map((v, i) => (
                <span
                  key={i}
                  className="text-slate-400 cursor-pointer hover:text-cyan-600"
                  onClick={async () =>
                    await router.push({
                      pathname: "/category",
                      query: { categoryName: v },
                    })
                  }
                >
                  {v}
                </span>
              ))}
            </section>
          </article>
        </section>
      </header>
      {children}
      <footer className="w-full h-[150px] bg-white flex items-center justify-center">
        <span className="text-xl text-neutral-400 italic">
          Starving Project
        </span>
      </footer>
    </div>
  );
};

export default Layout;
