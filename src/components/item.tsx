import { TodoProp } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Task({ item, removeItem, handleChange }: TodoProp) {
  const id = item.id;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      className="todolistBox text-sm"
      {...attributes}
      ref={setNodeRef}
      style={style}
    >
      <button {...listeners} type="button" className="mr-2">
        <img src="../../drag_indicator.svg" alt="drag-indicator"></img>
      </button>
      <input
        type="checkbox"
        id={item.id}
        onChange={handleChange(item.id)}
        checked={Boolean(item.completed)}
        name="checkList"
        className="cursor-pointer appearance-none circle flex-shrink-0"
      />
      <label htmlFor={item.id} className="cut text-lg flex-grow cursor-pointer">
        {item.text}
      </label>
      <button
        type="button"
        className="flex-shrink-0"
        onClick={() => removeItem(item.id)}
      >
        <img
          src="../../icon-cross.svg"
          alt="delete button"
          className="w-5 h-5"
        />
      </button>
    </div>
  );
}
