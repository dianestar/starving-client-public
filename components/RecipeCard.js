import React from "react";
import { useRouter } from "next/router";

const RecipeCard = ({
  pk,
  percent,
  nickname,
  desc,
  title,
  time,
  like,
  avatarImage,
  cookImages,
}) => {

  const router = useRouter();
  const pushToDetail = async () => {
    await router.push({
      pathname: "/detail",
      query: { recipePk: pk },
    });
  }

  return (
    <div className="w-[250px] h-[375px] bg-white border-solid border-2 border-neutral-200 flex flex-col items-center justify-between pb-8 relative my-2">
      <section
        className="w-[95%] h-[65%] bg-black mt-1 relative cursor-pointer"
        onClick={pushToDetail}
      >
        <img className="w-full h-full object-cover" src={cookImages[0]} />
        <article className="text-center text-white absolute bottom-0 right-0 mx-2 my-2">
          <p className="text-lg">LIKES</p>
          <p className="text-4xl font-bold">{percent}</p>
        </article>
      </section>
      <section
        className="cursor-pointer flex flex-col items-center"
      >
        <img className="absolute top-[50%] w-[60px] h-[60px] rounded-full object-cover" src={avatarImage || "/defaultAvatarImage.png"} />
        <span className="absolute top-[70%] text-neutral-400">{nickname}</span>
      </section>
      <section
        className="text-center cursor-pointer"
        onClick={pushToDetail}      
      >
          <p className="font-bold w-[200px] overflow-hidden text-ellipsis">{title}</p>
          <p className="w-[200px] overflow-hidden text-ellipsis">{desc}</p>
      </section>
    </div>
  );
};

export default RecipeCard;
