import React, { useState, useEffect } from "react";
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { db, uiConfig } from './components/Firebase.js';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import './App.css';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

function App() { 
    const [todos, setTodos] = useState([]); // Setup state for holding list of todo items

    // Function to save todo input field into firebase
    const saveTodo = (input) => {
        addDoc(collection(db,'todos'),{
            todo:input,
            timestamp: serverTimestamp()
          })
    };
    
    // Function to pull current list of todos from firebase
    const getTodos = () => {
        onSnapshot(query(collection(db,'todos'),orderBy('timestamp','desc')),(snapshot)=>{
            const currentFirebaseTodos = [];
            currentFirebaseTodos.push(snapshot.docs.map(doc=>({
                id: doc.id,
                item: doc.data()
            })))
            setTodos(currentFirebaseTodos[0]);
        })
    }

    // Fill todos state on first render & attach snapshot
    useEffect(() => {
        getTodos();
    }, []);
    
    // Auth function
    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
    const auth = getAuth();
    
    // Check for whether user signed in on initial render 
    useEffect(() => {
        const unregisterAuthObserver = auth.onAuthStateChanged(user => {
          setIsSignedIn(!!user);
        });
        return () => unregisterAuthObserver(); // Unn-register Firebase observers when the component unmounts.
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