import SignInButton from "../components/Auth/SignInButton";
import AuthContext from "../components/Auth/AuthContext";
import { useContext } from "react";

function Login() {
  const { user } = useContext(AuthContext); // Bring in user data from context

  if (user) {
    return <div>You are already logged in...</div>;
  }
  return (
    <>
      <h2>Welcome to sign in page</h2>
      <p>Please select from the options:</p>
      <SignInButton />
    </>
  );
}
export default Login;
