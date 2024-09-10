import TodoListItems from "./todoItems";
import { db } from "../firebase.config";
import React from "react";
import {
  deleteDoc,
  doc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { Todo, TodoUseState } from "../types";
import { DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

export default function TodoList({todoList,setTodoList}:TodoUseState) {
  // const [todoList, setTodoList] = React.useState<Todo[]>([]);
  const [state, setState] = React.useState("all");



  // changing the value of completed

  const handleChange =
    (id: string) => async (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedTodo = todoList.map((item:Todo) =>
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

  // removing completed item from list

  async function removeItem(id: string) {
    const deleteItemRef = doc(db, "todo", id);
    try {
      await deleteDoc(deleteItemRef);
    } catch (error) {
      alert("can not deleted data, Try again.");
      console.log("error", error);
    }
  }

  // deleting all completed items

  async function deleteItems() {
    const batch = writeBatch(db);

    todoList.forEach((todo) => {
      if (todo.completed) {
        const deleteItemRef = doc(db, "todo", todo.id);
        batch.delete(deleteItemRef);
      }
    });

    try {
      await batch.commit();
    } catch (error) {
      console.log("error", error);
    }
  }

  // changing list on drag and drop

  const getTask = (id: UniqueIdentifier) =>
    todoList.findIndex((task) => task.id === id);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setTodoList((item) => {
      const orginalPos = getTask(active.id);
      const newPos = getTask(over.id);
      const newList = arrayMove(item, orginalPos, newPos);
      // Update the order in Firestore using a batch
      const batch = writeBatch(db);
      newList.forEach((item, index) => {
        const todoDocRef = doc(db, "todo", item.id);
        batch.update(todoDocRef, { order: index });
      });

      // Commit the batch
      batch.commit().catch((error) => {
        console.error("Error updating order in Firestore", error);
      });
      return newList;
    });
  }

  return (
    <div>
      <div className="shadow-2xl overflow-hidden rounded-lg">
        <TodoListItems
          items={filteredTodoList}
          handleChange={handleChange}
          removeItem={removeItem}
          handleDragEnd={handleDragEnd}
        />
        <div className="flex justify-between p-4 text-slate-500 text-sm md:text-lg dark:text-green-lighter dark:bg-green-light todolistBox">
          <p>{n} items left</p>
          <button
            type="button"
            className="cursor-pointer hover:text-slate-800"
            onClick={deleteItems}
          >
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
