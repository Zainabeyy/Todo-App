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
      <button
        {...listeners}
        type="button"
        aria-label="Drag to reorder item"
        className="sm:w-8 h-auto w-6 cursor-grab select-none touch-none"
      >
        <img src="../../drag_indicator.svg" alt="drag-indicator" className="sm:w-8 h-auto w-6"/>
      </button>
      <input
        type="checkbox"
        id={item.id}
        onChange={handleChange(item.id)}
        checked={Boolean(item.completed)}
        disabled={false}
        name="checkList"
        className="cursor-pointer appearance-none circle flex-shrink-0"
      />
      <label
        htmlFor={item.id}
        className="cut sm:text-lg text-sm flex-grow cursor-pointer"
      >
        {item.text}
      </label>
      <button
        type="button"
        aria-label="Remove item"
        className="flex-shrink-0 sm:w-[2.2rem] w-[1.8rem] p-2"
        onClick={() => removeItem(item.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 18"
          className="svgImg"
        >
          <path
            fill="#494C6B"
            fillRule="evenodd"
            d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
          />
        </svg>
      </button>
    </div>
  );
}
