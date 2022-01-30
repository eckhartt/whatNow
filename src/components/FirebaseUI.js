import { GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";

// Configure FirebaseUI.
const uiConfig = {
    signInFlow: 'popup', // Popup signin flow rather than redirect flow.
    signInSuccessUrl: '/', // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInOptions: [ // We will display Google and Facebook as auth providers.
        EmailAuthProvider.PROVIDER_ID,
        GoogleAuthProvider.PROVIDER_ID,
    //   firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        signInSuccessWithAuthResult: function(authResult) {
            var user = authResult.user;
            console.log(user);
            // Do something with the returned AuthResult.
            // Return type determines whether we continue the redirect
            // automatically or whether we leave that to developer to handle.
            return false;
          },
    },
};
export { uiConfig }