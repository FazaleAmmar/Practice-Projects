import { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAdd = () => {
    setTodos([...todos, { todo, isCompleted: false }]);
    setTodo("");
    console.log(todos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <>
      <div className="container h-screen w-full bg-[#f7f8fa]">
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
            onClick={handleAdd}
            type="submit"
          >
            Add
          </button>
        </div>

        <div className="todos h-[60vh] w-[85vw] mx-35 rounded-2xl p-5 bg-red-500 overflow-auto flex
        flex-col items-center gap-5">
          {todos.map((todo) => (
            <div className="todo w-1/2 h-25 bg-red-400 rounded-3xl flex items-center justify-between px-2">
              <div className="text">
                <input className="mx-2" type="checkbox" />
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
