import { DragEndEvent } from "@dnd-kit/core";

export interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export type TodoContextType = {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  addTodo: (todo: string) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  deleteCompTasks: () => Promise<void>;
  changeCompStatus: (id: number, completed: boolean) => Promise<void>;
  updatePosition: (
    todo: {
      position: number;
      id: number;
    }[]
  ) => Promise<void>;
};

export type Todo = {
  id: number;
  task: string;
  completed: boolean;
  position: number;
};

export type TodoArrayProp = {
  items: Todo[];
  handleDragEnd: (e: DragEndEvent) => void;
};
