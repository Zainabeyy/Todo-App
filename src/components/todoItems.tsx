import { TodoArrayProp } from "../types";
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Task from "./item";

export default function TodoListItems(props: TodoArrayProp) {
  // rendring the element on screen
  const itemsEl = props.items.map((item) => (
    <Task
      item={item}
      removeItem={props.removeItem}
      handleChange={props.handleChange}
      key={item.id}
    />
  ));
  const sensors=useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250, // 250ms delay for touch
        tolerance: 5,  // 10px movement tolerance before activation
      },
    }),
    useSensor(KeyboardSensor,{
      coordinateGetter: sortableKeyboardCoordinates
    })
  )
  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={props.handleDragEnd}
      sensors={sensors}
    >
      <div className="h-full">
        <SortableContext
          items={props.items}
          strategy={verticalListSortingStrategy}
        >
          {itemsEl}
        </SortableContext>
      </div>
    </DndContext>
  );
}
