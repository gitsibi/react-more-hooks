import { useReducer, useRef, useState } from "react";
import './App.css';
const initialState = [];
const reducer = (state, action) => {
  switch (action.type) {
    case "addTask":
      return [...state, { id: state.length, text: action.content, toggle: true }];
    case "toggleContent":
      return state.map((item) =>
        item.id === action.selectedId ? { ...item, toggle: !item.toggle } : item
      );
    default:
      return state;
  }
};
function App()
{
  const [items, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef();
  const [inputUsed, setInputUsed] = useState(false);

  const addTask = (inputValue) => {
    if (inputValue) {
      dispatch({ type: "addTask", content: inputValue });
      setInputUsed(true);
    }
  };
  const toggleContent = (id) => {
    dispatch({ type: "toggleContent", selectedId: id });
  };
  const scrollUp = () => {
    inputRef.current.focus();
  };
  return (
    <div>
      <div className="up-margin"></div>
      <input ref={inputRef} type="text" className="textBox" placeholder="Type here something" 
      onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask(e.target.value);
            e.target.value = "";
          }
        }}
      />
      {inputUsed &&
        items.map((item) => (
          <div className="contentDiv" key={item.id}>
            <div>
              <div>{item.toggle ? item.text : "This content is hidden"}</div>
              <button onClick={() => toggleContent(item.id)}>Toggle</button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default App;
