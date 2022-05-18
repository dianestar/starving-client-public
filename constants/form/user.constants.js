export const USER_FORM_CONSTANTS = {
  REQUIRED: {
    email: "이메일을 입력해 주세요",
    nickname: "닉네임을 입력해 주세요",
    password: "비밀번호를 입력해 주세요",
    confirmPassword: "비밀번호를 확인해주세요.",
  },
  PATTERN: {
    email: "올바른 이메일 형식을 입력해 주세요",
    nickname: "닉네임은 2 자리 이상 12자리 이하입니다.",
    password: "비밀번호는 숫자와 영문 조합으로 8자리 이상입니다.",
  },
  MATCH: {
    confirmPassword: "비밀번호가 일치하지 않습니다.",
  },
  ALERT: {
    REGISTER: {
      resolve: "회원가입 완료!",
    },
    FAILED: {
      email: "이미 존재하는 이메일입니다.",
      nickname: "이미 존재하는 닉네임입니다.",
    },
  },
};
