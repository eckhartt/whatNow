import { useCallback, useState, useEffect } from "react";
import AuthContext, { User } from "./AuthContext";
// import SignInButton from './SignInButton'; // Don't need this as it has been included in <Login />
// @ts-ignore -> TODO: Figure out why the following import TS errors
import Login from "../../pages/Login";

import { onAuthStateChanged, getAuth } from "firebase/auth";

// TODO: Figure out what ": React .FC" does. Is this TS? -> 'AuthContextProvider: React.FC'

const AuthContextProvider: React.FC = ({ children }) => {
  // Accepts functional component as prop, checks user authentication status before deciding what to return
  const [isInitialized, setIsInitialized] = useState<boolean>(false); // Prepare state that will accept type 'boolean' defaulted to false
  const [user, setUser] = useState<null | User>(null); // Prepare state that will accept null or user data(see AuthContext User), defaulted to null

  // Looks for change in authentication status on firebase and then loads user state with details
  useEffect(() => {
    return onAuthStateChanged(getAuth(), (authResponse) => { // onAuthStateChanged, on change, returns authResponse object containing user data
      if (authResponse) { // If user data is returned, initialize app and put the returned data into User state 
        setIsInitialized(true);
        setUser({
          displayName: authResponse.displayName,
          email: authResponse.email,
          photo: authResponse.photoURL,
          uid: authResponse.uid,
        });
      } else {
        setIsInitialized(true);
        setUser(null);
      }
    });
  }, []);

  const getContent = useCallback(() => {
    if (!isInitialized) {
      return <div>Loading...</div>; // If initialization state not yet true, return loading text
    }
    if (user === null) {
      return <Login />; // If user is null, return login page.
    }
    return children; // Else, return the children passed into <AuthContextProvider>.
  }, [isInitialized, user, children]);

  return (
    <AuthContext.Provider value={{ user }}>{getContent()}</AuthContext.Provider>
  );
};

export default AuthContextProvider;