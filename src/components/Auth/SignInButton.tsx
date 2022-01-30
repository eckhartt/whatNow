// import firebase from "firebase/app";
import { Button } from "semantic-ui-react";
import { GoogleAuthProvider, signInWithRedirect, getAuth } from "firebase/auth";


const SignInButton = () => {
    const auth = getAuth();
  return (
    <Button
      size="tiny"
      color="blue"
      onClick={() => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
      }}
    >
      Sign in with Google
    </Button>
  );
};

export default SignInButton;