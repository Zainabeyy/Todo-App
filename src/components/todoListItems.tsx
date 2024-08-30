import { nanoid } from "nanoid";
export default function TodoListItems(props:{items:string[]}){
    const todoListElement = props.items.map((item) => {
        let id = nanoid();
        return (
          <div
            className="todolistBox text-sm"
            key={id}
          >
            <input
              type="checkbox"
              id={id}
              name="checkList"
              className="cursor-pointer appearance-none circle flex-shrink-0"
            />
            <label htmlFor={id} className="cut text-lg flex-grow cursor-pointer">
              {item}
            </label>
            <button type="button" className="flex-shrink-0">
              <img
                src="../../public/icon-cross.svg"
                alt="delete button"
                className="w-5 h-5"
              />
            </button>
          </div>
        );
      });
    return(
        <ul className="h-full">{todoListElement}</ul>
    )
}