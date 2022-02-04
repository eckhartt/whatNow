import { getAuth } from "firebase/auth";
// import { Button } from "semantic-ui-react";
import { Button } from 'theme-ui'


const SignOutButton = () => {
  const logout = () => {
    getAuth().signOut();
  };

  return <Button onClick={() => logout()}>sign out</Button>;
};

export default SignOutButton;
