import React, { useState, useEffect } from "react";
import { uiConfig } from './components/Firebase.js';
import { getAuth } from "firebase/auth";
import './App.css';
import App from './App';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

function Login() { 
    // Auth function
    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
    const auth = getAuth();
        
    // Check for whether user signed in on initial render 
    useEffect(() => {
        const unregisterAuthObserver = auth.onAuthStateChanged(user => {
          setIsSignedIn(!!user);
        });
        return () => unregisterAuthObserver(); // Un-register Firebase observers when the component unmounts.
      }, );

    // If user is not signed in, present sign-in screen. Otherwise present app view. 
    if (!isSignedIn) {
        return (
          <div>
            <p>Please sign-in:</p>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
          </div>
        );
      }
      return (
        <App />
    );
}
export default Login;