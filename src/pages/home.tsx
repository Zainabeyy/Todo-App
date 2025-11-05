import React from "react";
import TodoList from "../components/TodoList";
import { useTodoList } from "../hook/useTodoList";

export default function Home() {
  const [todo, setTodo] = React.useState<string>("");
  const { addTodo } = useTodoList();
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  function updateTodo(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const newValue = event.target.value;
    setTodo(newValue);
  }

  async function submitTodoList(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (todo.trim()) {
      addTodo(todo);
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
      <form onSubmit={submitTodoList} className="mt-8 mb-4 w-full">
        <div className="todolistBox rounded-md equalShadow">
          <label htmlFor="todo" className="circle"></label>
          <textarea
            ref={textareaRef}
            id="todo"
            name="todo"
            value={todo}
            onChange={(e) => updateTodo(e)}
            onKeyDown={handleKeyDown}
            rows={1}
            className="scroll-none focus:outline-none w-full caret-emerald-700 dark:caret-emerald-950 resize-none dark:bg-green-light"
            placeholder="Create a new todo..."
          ></textarea>
        </div>
      </form>

      <TodoList />

      <p className="text-[0.8rem] text-slate-500 text-center mt-3 md:text-lg dark:text-white-000">
        Drag and drop to reorder list using
        <img
          src="../drag_indicator.svg"
          alt="drag-indicator"
          className="inline-block"
        ></img>
      </p>
    </div>
  );
}
