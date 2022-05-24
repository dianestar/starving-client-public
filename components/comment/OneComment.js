import React, { useEffect, useState, useCallback, Fragment } from "react";
import { useForm, FormProvider } from "react-hook-form";
import CommentInput from "./CommentInput";
import { GET_AUTH } from "../../_axios/user";
import { PATCH_COMMENT, DELETE_COMMENT } from "../../_axios/comment";
import { useSnackbar } from "notistack";
import Button from "@mui/material/Button";
import router from "next/router";

const OneComment = ({
  commentPk,
  ownerPk,
  avatarImage,
  nickname,
  content,
  updateAt,
}) => {
  const methods = useForm();
  methods.setValue("comment", content);

  const [isEditMode, setIsEditMode] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onSubmit = async () => {
    try {
      const form = { pk: commentPk, content: methods.watch("comment") };
      const {
        data: { access },
      } = await PATCH_COMMENT(form);

      if (access) {
        enqueueSnackbar("수정되었습니다.", {
          variant: "success",
        });
      }
      router.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const onDelete = async () => {
    try {
      const {
        data: { access },
      } = await DELETE_COMMENT(commentPk);

      if (access) {
        enqueueSnackbar("삭제되었습니다.", {
          variant: "info",
        });
      }
      router.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const checkOwner = useCallback(async () => {
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
  }, [ownerPk]);

  useEffect(() => {
    checkOwner();
  }, [checkOwner]);

  return (
    <div className="space-y-1">
      <section className="flex items-center justify-between">
        <article className="flex items-center space-x-2">
          <img
            className="w-6 h-6 rounded-full"
            src={avatarImage ? avatarImage : "/defaultAvatarImage.png"}
          />
          <section className="flex flex-col ">
            <span className="font-bold text-cyan-600 text-xs">{nickname}</span>
            <span className="font-bold text-neutral-400 text-xs">
              {updateAt}
            </span>
          </section>
        </article>
        {isOwner && !isEditMode && (
          <article className="space-x-2">
            <span
              className="hover:cursor-pointer"
              onClick={() => setIsEditMode(true)}
            >
              ✏
            </span>
            <span
              className="hover:cursor-pointer"
              onClick={() => {
                const action = (key) => (
                  <Fragment>
                    <Button
                      color="error"
                      onClick={() => {
                        closeSnackbar(key);
                      }}
                    >
                      취소
                    </Button>
                    <Button color="error" onClick={onDelete}>
                      확인
                    </Button>
                  </Fragment>
                );

                return enqueueSnackbar("삭제하시겠습니까?", {
                  variant: "warning",
                  action,
                });
              }}
            >
              ❌
            </span>
          </article>
        )}
      </section>
      <section>
        {!isEditMode ? (
          <span>{content}</span>
        ) : (
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <CommentInput
                isEditMode={true}
                setIsEditMode={setIsEditMode}
                originText={content}
              />
            </form>
          </FormProvider>
        )}
      </section>
    </div>
  );
};

export default OneComment;
