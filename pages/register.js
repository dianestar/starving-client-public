import Head from "next/head";
import Layout from "../components/Layout";
import FormWrapper from "../components/form/FormWrapper";
import FormButton from "../components/form/FormButton";
import { useForm } from "react-hook-form";
import FormBg from "../components/form/FormBg";
import router from "next/router";
import { REGISTER } from "../_axios/user";
import FormErrorMessage from "../components/error/FormErrorMessage";
import { useSnackbar } from "notistack";
import { USER_FORM_CONSTANTS } from "../constants/form/user.constants";
import { SERVER_ERROR_CONSTANTS } from "../constants/error/sever.error.constants";

function Register() {
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    watch,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  const onSubmit = async () => {
    try {
      const {
        data: { access, message },
      } = await REGISTER(getValues());

      if (!access) {
        if (message === "This email already to exists") {
          return enqueueSnackbar(USER_FORM_CONSTANTS.ALERT.FAILED.email, {
            variant: "error",
          });
        } else if (message === "This nickname already to exists") {
          return enqueueSnackbar(USER_FORM_CONSTANTS.ALERT.FAILED.nickname, {
            variant: "error",
          });
        }
      } else {
        await router.push("/login");
        return enqueueSnackbar(USER_FORM_CONSTANTS.ALERT.REGISTER.resolve, {
          variant: "success",
        });
      }
    } catch (err) {
      SERVER_ERROR_CONSTANTS(err);
    }
  };

  return (
    <>
      <Head>
        <title>STARVING | REGISTER</title>
      </Head>
      <Layout>
        <FormBg>
          <FormWrapper
            title="회원가입"
            text1="로그인"
            text2="약관 보기"
            link1="/login"
            link2="/"
          >
            <form
              className="w-full flex flex-col items-center text-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label htmlFor="email" />
              <input
                name="email"
                className="input-email w-3/4 px-4 py-3"
                placeholder="이메일주소"
                {...register("email", {
                  required: USER_FORM_CONSTANTS.REQUIRED.email,
                  pattern: {
                    value:
                      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                    message: USER_FORM_CONSTANTS.PATTERN.email,
                  },
                })}
              />
              {errors.email && errors.email.message && (
                <FormErrorMessage message={errors.email.message} />
              )}

              <label htmlFor="nickname" />
              <input
                name="nickname"
                type="name"
                className="input-nickname w-3/4 px-4 py-3 mt-3"
                placeholder="닉네임"
                {...register("nickname", {
                  required: USER_FORM_CONSTANTS.REQUIRED.nickname,
                  pattern: {
                    value: /^[A-za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,12}$/,
                    message: USER_FORM_CONSTANTS.PATTERN.nickname,
                  },
                })}
              />
              {errors.nickname && errors.nickname.message && (
                <FormErrorMessage message={errors.nickname.message} />
              )}

              <label htmlFor="password" />
              <input
                name="password"
                type="password"
                className="input-password w-3/4 px-4 py-3 mt-3"
                placeholder="비밀번호(8자 이상)"
                {...register("password", {
                  required: USER_FORM_CONSTANTS.REQUIRED.password,
                  pattern: {
                    value: /(?=.*\d)(?=.*[a-z]).{8,}/,
                    message: USER_FORM_CONSTANTS.PATTERN.password,
                  },
                })}
              />
              {errors.password && errors.password.message && (
                <FormErrorMessage message={errors.password.message} />
              )}

              <label htmlFor="password_confirm" />
              <input
                name="password_confirm"
                type="password"
                className="input-confirmPassword w-3/4 px-4 py-3 mt-3 mb-3"
                placeholder="비밀번호 확인"
                {...register("password_confirm", {
                  required: USER_FORM_CONSTANTS.REQUIRED.password,
                  validate: (value) =>
                    value === watch("password") ||
                    USER_FORM_CONSTANTS.MATCH.confirmPassword,
                })}
              />
              {errors.password_confirm && errors.password_confirm.message && (
                <FormErrorMessage message={errors.password_confirm.message} />
              )}

              <FormButton desc="회원가입" />
            </form>
          </FormWrapper>
        </FormBg>
      </Layout>
    </>
  );
}

export default Register;
