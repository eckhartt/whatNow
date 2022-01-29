import React from "react";
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { getAuth } from "firebase/auth";
import './App.css';

function App() { 
      return (
        <div className="App">
            <p>Welcome {getAuth().currentUser.displayName}! You are now signed-in!</p>
            <button onClick={() => getAuth().signOut()}>Sign-out</button>
            <h2>Current Items</h2>
            <TodoList />
            <h2>What Now?</h2>
            <AddTodo />
        </div>
    );
}
export default App;