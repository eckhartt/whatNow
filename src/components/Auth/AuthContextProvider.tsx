import { useCallback, useState, useEffect } from "react";
import AuthContext, { User } from './AuthContext';
// import SignInButton from './SignInButton';
// @ts-ignore
import Login from '../../pages/Login';

import { onAuthStateChanged, getAuth } from "firebase/auth";

const AuthContextProvider: React.FC = ({ children }) => { // Accepts functional component as prop, checks user authentication status before deciding what to return
  const [isInitialized, setIsInitialized] = useState<boolean>(false); // Prepare state that will accept type 'boolean' defaulted to false 
  const [user, setUser] = useState<null | User>(null); // Prepare state that will accept null or user data(see AuthContext User), defaulted to null  

  // Looks for change in authentication status on firebase and then loads user state with details
  useEffect(() => {
    const auth = getAuth();
    return onAuthStateChanged(auth, (im) => {
      if (im) {
        setIsInitialized(true);
        setUser({
          displayName: im.displayName,
          email: im.email,
          photo: im.photoURL,
          uid: im.uid,
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
    return children; // Else, return the children. 
  }, [isInitialized, user, children]);

  return <AuthContext.Provider value={{ user }}>{getContent()}</AuthContext.Provider>;
};

export default AuthContextProvider;