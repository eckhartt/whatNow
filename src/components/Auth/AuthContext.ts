import { createContext } from "react";

export type User = {
  displayName: null | string;
  email: null | string;
  photo: null | string;
  uid: null | string;
};

type AuthContextValue = {
  user: null | User;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
});

export default AuthContext;