import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { GET_COMMENT } from "../_axios/comment";
import { POST_LIKE, DELETE_LIKE, GET_LIKE } from "../_axios/like";
import Image from "next/image";

const RecipeCard = ({
  pk,
  nickname,
  desc,
  title,
  likesCount,
  avatarImage,
  cookImages,
}) => {
  const [commentsCount, setCommentsCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [displayedLikes, setDisplayedLikes] = useState(likesCount);

  const router = useRouter();
  const pushToDetail = async () => {
    await router.push({
      pathname: "/detail",
      query: { recipePk: pk },
    });
  }

  const getCommentsCount = useCallback(async () => {
    try {
      const {
        data: { totalCount },
      } = await GET_COMMENT(1, 1, pk);
      setCommentsCount(totalCount);
    } catch (error) {
      console.log(error);
    }
  }, [pk]);

  const needLogin = async () => {
    enqueueSnackbar("로그인 또는 회원가입이 필요합니다", {
      variant: "warning",
    });
    await router.push("/login");
  };

  const getLike = useCallback(async () => {
    try {
      const {
        data: { access },
      } = await GET_LIKE(pk);
      
      if (access) {
        setLiked(true);
        
      }
      else {
        setLiked(false);
      }
    } catch (e) {
      console.log(e);
    }
  }, [pk]);

  const onClickLike = async () => {
    if (localStorage.getItem("access_token") === null) {
      needLogin();
    }

    const form = { recipePk: pk };

    if (liked) {
      try {
        const {
          data: { access },
        } = await DELETE_LIKE(form);

        if (access) {
          setLiked(false);
          setDisplayedLikes(displayedLikes-1);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const {
          data: { access },
        } = await POST_LIKE(form);

        if (access) {
          setLiked(true);
          setDisplayedLikes(displayedLikes+1);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getLike();
    getCommentsCount();
  }, [getLike, getCommentsCount]);

  return (
    <div className="w-[250px] h-[375px] bg-white border-solid border-2 border-neutral-200 flex flex-col items-center justify-between relative my-2">
      <section
        className="w-[95%] h-[60%] bg-black mt-1 relative cursor-pointer"
        onClick={pushToDetail}
      >
        <Image
          layout="fill"
          objectFit="cover"
          src={cookImages[0]}
          alt="cook image"/>
      </section>
      <section
        className="cursor-pointer flex flex-col items-center"
      > 
        <div className="w-[60px] h-[60px] absolute top-[50%]">
          <Image
            layout="fill"
            objectFit="cover"
            className="rounded-full"
            src={avatarImage || "/defaultAvatarImage.png"}
            alt="avatar image"
          />
        </div>
        <span className="absolute top-[67%] text-neutral-400">{nickname}</span>
      </section>
      <section
        className="text-center cursor-pointer"
        onClick={pushToDetail}      
      >
          <p className="font-bold w-[200px] truncate">{title}</p>
          <p className="w-[200px] truncate">{desc}</p>
      </section>
      <section className="w-full grid grid-cols-2 border-solid border-t-2 border-neutral-200 text-neutral-400 text-sm">
        <article className="w-full flex items-center justify-center border-solid border-r-2 border-neutral-200 cursor-pointer" onClick={onClickLike}>
          {liked ?
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1 text-pink-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          :
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1 text-pink-300 hover:text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          }
          <span>좋아요</span>
          <span>{displayedLikes}명</span>
        </article>
        <article className="w-full flex items-center justify-center cursor-pointer" onClick={pushToDetail}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span>댓글</span>
          <span>{commentsCount}개</span>
        </article>
      </section>
    </div>
  );
};

export default RecipeCard;
