import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { UPLOAD_AVATAR, GET_AUTH } from "../_axios/user";

const NO_USER_IMAGE_URL = "/defaultAvatarImage.png";

const AvatarImage = ({ nickname }) => {
  const imageInputRef = useRef();
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(NO_USER_IMAGE_URL);
  const [defaultUrl, setDefaultUrl] = useState(NO_USER_IMAGE_URL);
  const [editMode, setEditMode] = useState(false);

  const getUserImage = async () => {
    try {
      const {
        data: { avatarImage },
      } = await GET_AUTH();

      if (avatarImage) {
        setDefaultUrl(avatarImage);
        setImageUrl(avatarImage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserImage();
  }, []);

  const onChangeImage = async (e) => {
    setEditMode(true);
    setImageFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const onCancelImage = () => {
    setEditMode(false);
    setImageFile(null);
    setImageUrl(defaultUrl);
    URL.revokeObjectURL(imageUrl);
    imageInputRef.current.value = "";
  };

  const onConfirmImage = async () => {
    const form = new FormData();
    form.append("image", imageFile);

    try {
      const response = await UPLOAD_AVATAR(form);
      console.log(response);
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[100px] h-[100px] drop-shadow-lg">
      <section>
        <label className="cursor-pointer" htmlFor="image-input">
          <Image
            className="rounded-full object-cover"
            src={imageUrl}
            alt="avatar image preview"
            width={100}
            height={100}
          />
        </label>
        <input
          id="image-input"
          className="hidden"
          type="file"
          accept="image/*"
          ref={imageInputRef}
          onChange={onChangeImage}
        />
      </section>

      {editMode ? (
        <section className="space-x-2">
          <button
            className="border-solid border-2 rounded-md p-0.5 text-neutral-400 hover:text-white hover:bg-neutral-200"
            onClick={onCancelImage}
          >
            취소
          </button>
          <button
            className="border-solid border-2 rounded-md p-0.5 text-neutral-400 hover:text-white hover:bg-neutral-400"
            onClick={onConfirmImage}
          >
            확인
          </button>
        </section>
      )
      :
      <p className="font-semibold text-sm text-center mt-2">
        {nickname}<span className="font-light">님</span>
      </p>
      }
    </div>
  );
};

export default AvatarImage;
