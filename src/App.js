import React, { useState, useEffect } from "react";
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { db } from './components/Firebase.js';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import './App.css';

function App() {
    // Setup state for holding list of todo items 
    const [todos, setTodos] = useState([]);

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
            console.log(`snapshot is`, snapshot)
            const currentFirebaseTodos = [];
            currentFirebaseTodos.push(snapshot.docs.map(doc=>({
                id: doc.id,
                item: doc.data()
            })))
            console.log(`currentFirebaseTodos is`, currentFirebaseTodos);
            setTodos(currentFirebaseTodos[0]);
        })
    }

    // Fill state on first render
    useEffect(() => {
        getTodos();
    }, []);

    return (
        <div className="App">
            <h2>What Now?</h2>
            <AddTodo saveTodo={saveTodo} getTodos={getTodos} />
            <h2>Current Items</h2>
            <TodoList todos={todos} />
        </div>
    );
}
export default App;