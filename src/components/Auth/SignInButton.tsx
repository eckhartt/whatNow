// import firebase from "firebase/app";
// import { Button } from "semantic-ui-react";
import { Button } from 'theme-ui'
import { GoogleAuthProvider, signInWithRedirect, getAuth } from "firebase/auth";

const SignInButton = () => {
  const auth = getAuth();
  return (
    <Button // TODO: figure out why this doesn't have our theme styling. Is it outside of theme provider somehow? 
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
