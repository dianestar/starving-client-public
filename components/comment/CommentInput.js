import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

// EditMode인 경우에만 setIsEditMode, originText props 넘겨줌
const CommentInput = ({ isEditMode, setIsEditMode = null, originText = "" }) => {
    const { register, setFocus } = useFormContext();

    useEffect(() => {
        if (isEditMode) setFocus("comment");
    }, [isEditMode, setFocus]);

    return (
        <div>
            <textarea
                className="resize-none w-full text-sm p-2 rounded"
                placeholder={originText || "댓글의 내용을 입력해주세요"}
                {...register("comment", { required: true })}
            />
            <div className="space-x-2 text-right">
                {isEditMode && // EditMode인 경우에만 취소 버튼 노출
                    <button
                        type="button"
                        onClick={() => setIsEditMode(false)}
                        className="w-12 rounded bg-neutral-400 hover:bg-neutral-500 text-white font-bold"
                    >
                        취소
                    </button>
                }
                <button type="submit" className="w-12 rounded bg-cyan-400 hover:bg-cyan-500 text-white font-bold">확인</button>
            </div>
        </div>
    );
}

export default CommentInput;