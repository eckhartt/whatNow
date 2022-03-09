/** @jsxImportSource theme-ui */
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { Container } from "../components/Layout";
import { Heading } from "theme-ui";

export default function Home() {
  return (
    <>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Heading as="h3">
          {new Date().toLocaleString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
          })}
        </Heading>
      </Container>
      <Container sx={{ flexGrow: "1" }}>
        <TodoList />
      </Container>
      <Container>
        <AddTodo />
      </Container>
    </>
  );
}

