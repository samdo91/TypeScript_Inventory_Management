import { atom } from "jotai";
import { UserSignUPDataTY } from "../../comp/page/signUpPage/signUpPage";

// 로그인창을 모달로 띄우기로 되어있다. 트루가 되면 모달이 뜬다.
export const loginModals = atom<boolean>(false);

export const loginStateAtom = atom<boolean>(false);

type UserDataTY = UserSignUPDataTY & {
  // 유저 데이터 타입 정의
  loginState: boolean;
  token: boolean;
};

// 유저데이터가 저장된다.
export const userDataAtom = atom<UserDataTY>({
  loginState: false,
  token: false,
  companyName: "",
  ID: "",
  password: "",
  name: "",
  eMail: "",
  phoneNumber: "",
  companyDepartment: "",
  position: "",
});