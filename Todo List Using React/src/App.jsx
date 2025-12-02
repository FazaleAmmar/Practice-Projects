import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./components/Navbar";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = JSON.parse(localStorage.getItem("todos"));
    if (todoString === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    }

    let todos = JSON.parse(localStorage.getItem("todos"));
    setTodos(todos);
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleAdd = () => {
    if (todo.trim() === "") return;

    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);
    setTodo("");
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setTodo(value);
    localStorage.setItem("todo", value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;

    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );

    setTodos(updatedTodos);
  };

  const handleDelete = (id) => {
    let newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleEdit = (id) => {
    let index = todos.findIndex((todo) => todo.id === id);

    let newTodos = [...todos];
    newTodos[index] = {
      ...newTodos[index],
      todo: prompt("Edit todo", newTodos[index].todo),
    };
    setTodos(newTodos);
    saveToLS();
  };
  const toggleFinished = () => {
    setshowFinished(!showFinished);
  };

  return (
    <>
      <div className="container min-h-screen w-full bg-[#f7f8fa] flex items-center flex-col">
        <Navbar />
        <div className="input w-full flex items-center justify-center px-4 mt-5">
          <input
            className="w-full max-w-md outline-none border-none bg-blue-300 rounded-l-full py-4 px-4 font-bold text-sm sm:text-md"
            onChange={handleChange}
            onKeyPress={handleEnter}
            value={todo}
            type="text"
            name="task"
            placeholder="What do you need to do?"
          />

          <button
            className="outline-none border-none bg-blue-500 rounded-r-full h-14 w-14 sm:w-20 font-bold text-lg sm:text-xl text-white hover:bg-blue-700 cursor-pointer active:bg-blue-800"
            type="button"
            disabled={todo.length < 3}
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
        <div className="flex item-start justify-center gap-5">
          <input
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
          />{" "}
          <span>Show Finished</span>
        </div>
        <div className="todos w-full max-w-5xl min-h-[65vh] rounded-2xl p-4 sm:p-5 bg-red-500 flex flex-col items-center gap-4 mt-6">
          {todos.length === 0 && (
            <p className="font-bold text-lg sm:text-2xl text-white">
              No todos yet.
            </p>
          )}
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="todo w-full h-16 sm:h-20 bg-red-400 rounded-3xl flex items-center justify-between px-3"
            >
              <div
                className={`flex items-center w-full overflow-hidden ${
                  todo.isCompleted ? "line-through" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name={todo.id}
                  checked={todo.isCompleted}
                  onChange={handleCheckbox}
                />

                <span className="truncate text-sm sm:text-base">
                  {todo.todo}
                </span>
              </div>

              <div className="btns flex shrink-0">
                <button
                  onClick={() => {
                    handleEdit(todo.id);
                  }}
                  className="edit hover:bg-red-500 active:bg-red-700 cursor-pointer bg-red-300 rounded-full h-8 w-8 sm:h-10 sm:w-10 mx-1 text-[10px] sm:text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(todo.id)}
                  className="delete hover:bg-red-500 active:bg-red-700 cursor-pointer bg-red-300 rounded-full h-8 w-8 sm:h-10 sm:w-10 mx-1 text-[10px] sm:text-sm"
                >
                  Del
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
