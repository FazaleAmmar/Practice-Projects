import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./components/Navbar";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAdd = () => {
    if (todo.trim() === "") return;

    setTodos([...todos, { id: uuidv4(), todo: todo, isCompleted: false }]);
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;

    let index = todos.findIndex((todo) => todo.id === id);

    if (index === -1) return;

    let newTodos = [...todos];
    newTodos[index] = {
      ...newTodos[index],
      isCompleted: !newTodos[index].isCompleted,
    };
    setTodos(newTodos);
  };

  return (
    <>
      <div className="container min-h-screen w-full bg-[#f7f8fa] flex items-center flex-col">
        <Navbar />

        <div className="input w-full h-30 flex items-center justify-center">
          <input
            className="w-96 outline-none border-none bg-blue-300 rounded-l-full py-5 px-4 font-bold text-md"
            onChange={handleChange}
            value={todo}
            type="text"
            name="task"
            placeholder="What do you need to do?"
          />
          <button
            className="outline-none border-none bg-blue-500 rounded-r-full h-16 w-20 font-bold text-xl text-white hover:bg-blue-700 cursor-pointer active:bg-blue-800"
            type="button"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>

        <div
          className="todos w-[85vw] min-h-[65vh] rounded-2xl p-5 bg-red-500 flex
        flex-col items-center gap-5"
        >
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="todo min-w-116 h-20 bg-red-400 rounded-3xl flex items-center justify-between px-2"
            >
              <div className={todo.isCompleted ? "line-through" : ""}>
                <input
                  name={todo.id}
                  checked={todo.isCompleted}
                  onChange={handleCheckbox}
                  className="mx-2"
                  type="checkbox"
                />
                {todo.todo}
              </div>
              <div className="btns">
                <button className="edit bg-red-300 rounded-full h-10 w-10 mx-2">
                  Edit
                </button>
                <button className="delete bg-red-300 rounded-full h-10 w-10 mx-2">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
