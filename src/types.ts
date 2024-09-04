export type dbTodo={
    text:string,
    completed:boolean
}

export type Todo = dbTodo & {
    id:string,
 }

export type TodoProp = {
    items: Todo[];
    handleChange: (
      id: string
    ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  };