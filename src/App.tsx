import React from "react";
import TodoList from "./components/TodoList";

type darkMode = {
  toggleTheme: () => void;
  darkmode: boolean;
};

function App(props: darkMode) {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const [todo, setTodo] = React.useState("");
  const [todoItem, setTodoItem] = React.useState(todo);

  // adjusting height of textarea

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

  // creating todo item and submit it to form on enter button

  function makeTodo(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setTodo(event.target.value);
  }
  function submitTodoList(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTodoItem(todo);
    setTodo("");
  }
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
          <h1 className="text-4xl uppercase font-semibold text-slate-700 dark:text-white md:text-6xl">
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
        <TodoList todoItem={todoItem} />
        <p className="text-sm text-slate-500 text-center mt-3 md:text-lg dark:text-white-000">
          Drag and drop to reorder list
        </p>
      </div>
    </div>
  );
}

export default App;
