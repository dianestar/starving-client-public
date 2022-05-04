import React, { useEffect, useState, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import OneComment from "./OneComment";
import CommentInput from "./CommentInput";
import CustomizedPaginate from "../CustomizedPaginate";
import { GET_COMMENT, POST_COMMENT } from "../../_axios/comment";
import { useSnackbar } from "notistack";

const CommentArea = ({recipePk}) => {
  const methods = useForm();

  const { enqueueSnackbar } = useSnackbar();

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const [toggle, setToggle] = useState(false);

  const onSubmit = async () => {
    const form = {
      content: methods.watch("comment"),
      recipePk: recipePk,
    };

    try {
      const res = await POST_COMMENT(form);
      if (res) {
        methods.setValue("comment", "");
        setToggle(!toggle);
        enqueueSnackbar("댓글이 작성되었습니다", { variant: "info" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = useCallback(async () => {
    try {
      const {
        data: { totalCount, totalPages, comments },
      } = await GET_COMMENT(page, 4, recipePk);

      setPageCount(totalPages);
      setComments(comments);
      setCommentsCount(totalCount);
    } catch (error) {
      console.log(error);
    }
  }, [page, recipePk]);

  useEffect(() => {
    getComments();
  }, [getComments, toggle]);

  return (
    <div>
      <section>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <CommentInput isEditMode={false} />
          </form>
        </FormProvider>
      </section>
      <section className="min-h-[400px] space-y-4 my-4">
        <span className="text-sm font-bold text-neutral-400">
          {commentsCount} Comments
        </span>
        {comments.map((comment, index) => (
          <OneComment
            key={comment.pk}
            commentPk={comment.pk}
            ownerPk={comment.owner.pk}
            avatarImage={comment.owner.avatarImage}
            nickname={comment.owner.nickname}
            content={comment.content}
            updateAt={new Date(comment.updateAt).toLocaleString("ko-KR")}
          />
        ))}
      </section>
      <CustomizedPaginate
        setPage={setPage}
        pageCount={pageCount}
        pageRangeDisplayed={3}
      />
    </div>
  );
};

export default CommentArea;
