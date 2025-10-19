import { DragEndEvent } from "@dnd-kit/core";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
  order: number;
};

export type TodoArrayProp = {
  items: Todo[];
  handleChange: (
    id: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeItem: (id: string) => void;
  handleDragEnd: (e: DragEndEvent) => void;
};

export type TodoProp = {
  item: Todo;
  handleChange: (
    id: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeItem: (id: string) => void;
};

export type TodoUseState = {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
};
