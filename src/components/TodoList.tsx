import TodoListItems from "./todoListItems";
import { db } from "../firebase.config";
import React from "react";
import { collection, getDocs } from "firebase/firestore";

export default function TodoList(props: { todoItem: string }) {
  const [todoList, setTodoList] = React.useState([]);

  // reading data from firestore

  const dbRef = collection(db, "todo");

  React.useEffect(() => {
    async function getTodoList() {
      try {
        const data = await getDocs(dbRef);
        console.log(data);
        
      } catch (error) {
        console.log(error);
      }
    }

    getTodoList();
  }, []);
  const todoitemList = [
    "Complete todo app on frontend mentor",
    "complete online javascript course mentor",
    "jog around the park 3*",
    "10 minutes meditation",
    "Read for 1hour",
    "Pick up groceries",
  ];
  todoitemList.push(props.todoItem);
  return (
    <div>
      <div className="shadow-2xl overflow-hidden rounded-lg">
        <TodoListItems items={todoitemList} />
        <div className="flex justify-between p-4 text-slate-500 text-sm md:text-lg dark:text-green-lighter dark:bg-green-light todolistBox">
          <p>5 items left</p>
          <button type="button" className="cursor-pointer hover:text-slate-800">
            clear completed
          </button>
        </div>
      </div>
      <div className="todolistBox shadow-xl my-4 flex justify-evenly font-bold text-slate-400 md:text-lg dark:text-white-000 rounded-md">
        <div>
          <input
            type="radio"
            name="showTodo"
            id="all"
            className="appearance-none"
          />
          <label htmlFor="all" className="cursor-pointer">
            All
          </label>
        </div>
        <div>
          <input
            type="radio"
            name="showTodo"
            id="active"
            className="appearance-none"
          />
          <label htmlFor="active" className="cursor-pointer">
            Active
          </label>
        </div>
        <div>
          <input
            type="radio"
            name="showTodo"
            id="completed"
            className="appearance-none"
          />
          <label htmlFor="completed" className="cursor-pointer">
            Completed
          </label>
        </div>
      </div>
    </div>
  );
}
