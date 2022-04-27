import React, { useEffect, useState, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import CommentInput from "./CommentInput";
import { GET_AUTH } from "../../_axios/user";

const OneComment = ({ ownerPk, avatarImage, nickname, content, updateAt }) => {
    const methods = useForm();
    methods.setValue("comment", content);

    const [isEditMode, setIsEditMode] = useState(false);
    const [isOwner, setIsOwner] = useState(false);

    const onSubmit = async () => {
        // PATCH
    }

    const onDelete = async () => {
        // DELETE
    }

    const checkOwner = useCallback(
        async () => {
          try {
            const {
              data: { pk },
            } = await GET_AUTH();
    
            if (pk) {
                if (pk === ownerPk) setIsOwner(true);
                else setIsOwner(false);
            }
          } catch (error) {
            console.log(error);
          }
        },
        [ownerPk]
    );

    useEffect(() => {
        checkOwner();
    }, [checkOwner]);

    return (
        <div className="space-y-1">
            <section className="flex items-center justify-between">
                <article className="flex items-center space-x-2">
                    <img className="w-6 h-6 rounded-full" src={avatarImage}/>
                    <section className="flex flex-col ">
                        <span className="font-bold text-cyan-600 text-xs">{nickname}</span>
                        <span className="font-bold text-neutral-400 text-xs">{updateAt}</span>
                    </section>
                </article>
                { isOwner && !isEditMode &&
                    <article className="space-x-2">
                        <span className="hover:cursor-pointer" onClick={() => setIsEditMode(true)}>✏</span>
                        <span className="hover:cursor-pointer" onClick={onDelete}>❌</span>
                    </article>
                }                
            </section>
            <section>
                {!isEditMode ?
                    <span>{content}</span>
                :
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <CommentInput isEditMode={true} setIsEditMode={setIsEditMode} originText={content}/>
                        </form>
                    </FormProvider>
                } 
            </section>
        </div>
    );
}

export default OneComment;