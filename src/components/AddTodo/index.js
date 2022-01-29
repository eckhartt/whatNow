import React, { useState } from "react";
import { TextField, Button } from '@mui/material';


function AddTodo({ saveTodo, getTodos }) {
  const [input, setInput] = useState(""); // Setup state for task input field

  const handleSubmit = (e) => {
    e.preventDefault();
    saveTodo(input); // Save to firebase
    // getTodos(); // Pull updated list of todos from firebase - I don't think we need this now we are attaching snapshot with useEffect
    setInput(""); // Update state for input field to empty string
  };

  return (
    <>
      <center>
        <form onSubmit={handleSubmit}>
          <div className="input">
            <TextField id="outlined-basic" variant="outlined" style={{margin:"0px 5px"}} size="small" required value={input} onChange={(e) => setInput(e.target.value)} />
            <Button variant="contained" color="primary" type="submit">Add Task</Button>
          </div>
        </form>
      </center>
    </>
  );
}

export default AddTodo;