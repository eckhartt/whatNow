import SignInButton from "../components/Auth/SignInButton";
import useAuthContext from "../components/Auth/useAuthContext";

function Login() {
  const { user } = useAuthContext // Bring in user data from context

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
