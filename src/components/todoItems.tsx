import { TodoProp } from "../types";

export default function TodoListItems(props: TodoProp) {

  // mapping over the todo list array

  const todoListElement = props.items.map((item) => {
    return (
      <div className="todolistBox text-sm" key={item.id}>
        <input
          type="checkbox"
          id={item.id}
          onChange={props.handleChange(item.id)}
          checked={Boolean(item.completed)}
          name="checkList"
          className="cursor-pointer appearance-none circle flex-shrink-0"
        />
        <label
          htmlFor={item.id}
          className="cut text-lg flex-grow cursor-pointer"
        >
          {item.text}
        </label>
        <button type="button" className="flex-shrink-0">
          <img
            src="../../icon-cross.svg"
            alt="delete button"
            className="w-5 h-5"
          />
        </button>
      </div>
    );
  });

  // rendring the element on screen

  return <ul className="h-full">{todoListElement}</ul>;
}
