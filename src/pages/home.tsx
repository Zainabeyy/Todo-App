import React from "react";
import TodoList from "../components/TodoList";
import { Todo } from "../types";
import { nanoid } from "nanoid";

type darkMode = {
  toggleTheme: () => void;
  darkmode: boolean;
};

function Home(props: darkMode) {
  const [todoList, setTodoList] = React.useState<Todo[]>(() => {
    const savedTask = localStorage.getItem("taskArray");
    try {
      return savedTask ? JSON.parse(savedTask) : [];
    } catch (e) {
      console.error("Error parsing JSON from localStorage:", e);
      return [];
    }
  });
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const [todo, setTodo] = React.useState<string>("");

  // creating todo item and submit it to form on enter button

  function makeTodo(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setTodo(event.target.value);
  }

  async function submitData() {
    setTodoList((prev) => [
      ...prev,
      { id: nanoid(), text: todo, completed: false, order: prev.length },
    ]);
  }

  React.useEffect(() => {
    localStorage.setItem("taskArray", JSON.stringify(todoList));
  }, [todoList]);

  function submitTodoList(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (todo.trim()) {
      submitData();
      setTodo("");
    }
  }

  // adjusting height of textarea as the text increase

  function adjustHeight() {
    if (textareaRef.current) {
      const textRefcurrent = textareaRef.current;
      textRefcurrent.style.height = "auto";
      textRefcurrent.style.height = `${textRefcurrent.scrollHeight}px`;
    }
  }
  React.useEffect(() => {
    adjustHeight();
  }, [todo]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      const form = event.currentTarget.form;
      if (form) {
        form.requestSubmit(); // Submit the form programmatically
      }
    }
  }

  return (
    <div className="px-6 py-12 max-w-2xl m-auto">
      <div className="backgroundImg"></div>
      <div className="relative z-5">
        <div className="flex justify-between">
          <h1 className="text-4xl uppercase font-semibold text-slate-700 dark:text-white-000 md:text-6xl">
            todo
          </h1>
          <label htmlFor="darkMode" className="cursor-pointer">
            <input
              className="hidden"
              type="checkbox"
              id="darkMode"
              name="darkMode"
              onChange={props.toggleTheme}
              checked={props.darkmode}
              value={todo}
            />
            <img
              src={props.darkmode ? "icon-sun.svg" : "icon-moon.svg"}
              className="w-auto h-auto"
              alt="toggle Theme button"
            />
          </label>
        </div>
        <form onSubmit={submitTodoList} className="mt-8 mb-4 w-full">
          <div className="todolistBox rounded-md shadow-xl">
            <label htmlFor="todo" className="circle"></label>
            <textarea
              ref={textareaRef}
              id="todo"
              name="todo"
              value={todo}
              onChange={(e) => makeTodo(e)}
              onKeyDown={handleKeyDown}
              rows={1}
              className="scroll-none focus:outline-none w-full caret-emerald-700 dark:caret-emerald-950 resize-none dark:bg-green-light"
              placeholder="Create a new todo..."
            ></textarea>
          </div>
        </form>
        <TodoList todoList={todoList} setTodoList={setTodoList} />
        <p className="text-[0.8rem] text-slate-500 text-center mt-3 md:text-lg dark:text-white-000">
          Drag and drop to reorder list using
          <img
            src="../drag_indicator.svg"
            alt="drag-indicator"
            className="inline-block"
          ></img>
        </p>
      </div>
    </div>
  );
}

export default Home;
