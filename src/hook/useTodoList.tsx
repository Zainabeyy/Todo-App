import { createContext, useContext, useState, ReactNode } from "react";
import { Todo, TodoContextType } from "../types";
import React from "react";

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  // ---- fetch data in start -----

  React.useEffect(() => {
    async function fetchTasks() {
      const response = await fetch("http://localhost:8000/api/todo");
      const todo = await response.json();
      setTodoList(todo);
    }
    fetchTasks();
  }, []);

  // ---- add new todo -----

  async function addTodo(todo: string) {
    const response = await fetch("http://localhost:8000/api/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: todo,
        completed: 0,
        position: todoList.length,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to add todo");
    }
    const newTodo = await response.json();
    setTodoList((prev) => [...prev, newTodo]);
  }

  // ---- delete task -----

  async function deleteTask(id: number) {
    const res = await fetch(`http://localhost:8000/api/todo/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("can not delete task");
    }
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  }

  // ---- delete completed todo -----

  async function deleteCompTasks() {
    const res = await fetch(`http://localhost:8000/api/todo/completed`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("can not delete completed tasks");
    }
    setTodoList((prev) => prev.filter((todo) => !todo.completed));
  }

  // ---- change status of task -----

  async function changeCompStatus(id: number, completed: boolean) {
    const res = await fetch(`http://localhost:8000/api/todo/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    if (!res.ok) {
      throw new Error("can not Update tasks status");
    }
    setTodoList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  // ---- update task position -----

  async function updatePosition(
    todo: {
      position: number;
      id: number;
    }[]
  ) {
    const res = await fetch(`http://localhost:8000/api/todo/reorder`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    if (!res.ok) {
      throw new Error("can not Update tasks status");
    }
  }

  // ---- context provider -----

  return (
    <TodoContext.Provider
      value={{
        todoList,
        setTodoList,
        addTodo,
        deleteTask,
        deleteCompTasks,
        changeCompStatus,
        updatePosition,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoList = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodo must be used within a TodoProvider");
  return context;
};
