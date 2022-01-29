import React, { useState, useEffect } from "react";
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { db, uiConfig } from './components/Firebase.js';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import './App.css';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

function App() { 
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

    const uid = (!isSignedIn) ? 'test' : auth.currentUser.uid; // Check if user signed in and if so assign their uid
    console.log(`uid on setup is`,uid);
    
    const [todos, setTodos] = useState([]); // Setup state for holding list of todo items

    // Function to save todo input field into firebase
    const saveTodo = (input) => {
        addDoc(collection(db,'tasks'),{
            taskName:input,
            creationDate: serverTimestamp(),
            complete: false,
            ownerId: uid,
            ownerName: 'Nicholas',
            type: 'todo',
          })
    };

    // Function to pull current list of todos from firebase
    const getTodos = () => {
        onSnapshot(query(collection(db,'tasks'),where('ownerId', '==', uid),orderBy('creationDate','desc')),(snapshot)=>{
            console.log(`snapshot is`,snapshot);
            const currentFirebaseTodos = [];
            currentFirebaseTodos.push(snapshot.docs.map(doc=>({
                id: doc.id,
                item: doc.data()
            })))
            console.log(`currentFirebaseTodos[0] is`,currentFirebaseTodos[0]);
            setTodos(currentFirebaseTodos[0]);
        })
    }

    // Fill todos state on first render & attach snapshot
    useEffect(() => {
        getTodos();
    }, []);


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
        <div className="App">
            <p>Welcome {auth.currentUser.displayName}! You are now signed-in!</p>
            <button onClick={() => auth.signOut()}>Sign-out</button>
            <h2>Current Items</h2>
            <TodoList todos={todos} />
            <h2>What Now?</h2>
            <AddTodo saveTodo={saveTodo} getTodos={getTodos} />
        </div>
    );
}
export default App;