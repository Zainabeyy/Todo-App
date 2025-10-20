import { DragEndEvent } from "@dnd-kit/core";

export type darkMode = {
  toggleTheme: () => void;
  darkmode: boolean;
};

export type Todo = {
  id: number;
  task: string;
  completed: boolean;
  order: number;
};

export type TodoArrayProp = {
  items: Todo[];
  handleChange: (
    id: number
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeItem: (id: number) => void;
  handleDragEnd: (e: DragEndEvent) => void;
};

export type TodoProp = {
  item: Todo;
  handleChange: (
    id: number
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeItem: (id: number) => void;
};

export type TodoUseState = {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
};
