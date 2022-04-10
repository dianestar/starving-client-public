import React, { useState, useRef } from "react";
import Image from "next/image";
import { UPLOAD_AVATAR } from "../_axios/user";

const DEFAULT_URL = "/defaultAvatarImage.png"

const AvatarImage = () => {
    const imageInputRef = useRef();
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(DEFAULT_URL);
    const [editMode, setEditMode] = useState(false);

    const onChangeImage = (e) => {
        setEditMode(true);
        setImageFile(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    }

    const onCancelImage = () => {
        setEditMode(false);
        setImageFile(null);
        setImageUrl(DEFAULT_URL);
        URL.revokeObjectURL(imageUrl);
        imageInputRef.current.value = "";
    }

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
    }

    return (
        <div className="w-[150px] h-[150px] flex flex-col items-center justify-center border-solid border-2">
            <section>
                <label className="cursor-pointer" htmlFor="image-input">
                    <Image className="rounded-full" src={imageUrl} alt="avatar image preview" width={75} height={75}/>
                </label>
                <input id="image-input" className="hidden" type="file" accept="image/*" ref={imageInputRef} onChange={onChangeImage}/>
            </section>

            {editMode &&
            <section className="space-x-2">
                <button className="border-solid border-2 rounded-md p-0.5 text-neutral-400 hover:text-white hover:bg-neutral-200" onClick={onCancelImage}>
                    취소
                </button>
                <button className="border-solid border-2 rounded-md p-0.5 text-neutral-400 hover:text-white hover:bg-neutral-400" onClick={onConfirmImage}>
                    확인
                </button>
            </section>
            }
        </div>
    );
}

export default AvatarImage;