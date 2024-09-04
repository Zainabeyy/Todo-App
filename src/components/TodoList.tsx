import TodoListItems from "./todoItems";
import { db } from "../firebase.config";
import React from "react";
import {
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { Todo } from "../types";

export default function TodoList() {
  const [todoList, setTodoList] = React.useState<Todo[]>([]);
  const [state, setState] = React.useState("all");

  // reading data from firestore

  const dbRef = collection(db, "todo");

  React.useEffect(() => {
    const fetchingData = onSnapshot(
      dbRef,
      (querySnapshot) => {
        const todoData: Todo[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            text: data.text,
            completed: data.completed,
          };
        });
        setTodoList(todoData);
      },
      (error) => {
        console.log("Error fetching data:", error);
      }
    );

    return () => fetchingData();
  }, []);

  // changing the value of completed

  const handleChange =
    (id: string) => async (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedTodo = todoList.map((item) =>
        id === item.id ? { ...item, completed: event.target.checked } : item
      );
      setTodoList(updatedTodo);

      // Update the completed status in Firestore

      const todoDocRef = doc(db, "todo", id);
      try {
        await updateDoc(todoDocRef, { completed: event.target.checked });
      } catch (error) {
        console.log("Error updating document:", error);
      }
    };

  // changing the value of radio (all,active,completed)

  function handleRadio(event: React.ChangeEvent<HTMLInputElement>) {
    setState(event.target.value);
  }

  // Filter todos based on the selected state

  const filteredTodoList = todoList.filter((item) => {
    if (state === "completed") return item.completed;
    if (state === "active") return !item.completed;
    return true; // "all" case
  });

  // checking the number of items that are left

  const n = todoList.filter((item) => !item.completed).length;

  return (
    <div>
      <div className="shadow-2xl overflow-hidden rounded-lg">
        <TodoListItems items={filteredTodoList} handleChange={handleChange} />
        <div className="flex justify-between p-4 text-slate-500 text-sm md:text-lg dark:text-green-lighter dark:bg-green-light todolistBox">
          <p>{n} items left</p>
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
            onChange={handleRadio}
            value="all"
            checked={state === "all"}
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
            onChange={handleRadio}
            value="active"
            checked={state === "active"}
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
            onChange={handleRadio}
            value="completed"
            checked={state === "completed"}
          />
          <label htmlFor="completed" className="cursor-pointer">
            Completed
          </label>
        </div>
      </div>
    </div>
  );
}
