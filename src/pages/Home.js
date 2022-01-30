import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import SignOutButton from '../components/Auth/SignOutButton'
import '../App.css';

export default function Home() {
  return (
    <div className="App">
        <TodoList />
        <AddTodo />
        <p> You are logged in.</p>
        <SignOutButton />
    </div>
);}