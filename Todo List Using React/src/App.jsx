import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./components/Navbar";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);

    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
  }, []);

  const saveToLS = (data) => {
    localStorage.setItem("todos", JSON.stringify(data));
  };

  const handleAdd = () => {
    if (todo.trim() === "") return;
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);
    setTodo("");
    saveToLS(newTodos);
  };

  const handleChange = (e) => setTodo(e.target.value);

  const handleEnter = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);
    saveToLS(updatedTodos);
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleEdit = (id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) return;
    const newText = prompt("Edit todo", todos[index].todo);
    if (!newText || newText.trim() === "") return;
    const newTodos = [...todos];
    newTodos[index].todo = newText;
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const toggleFinished = () => setShowFinished(!showFinished);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const themeClasses =
    theme === "light"
      ? {
          // Page background: soft cream
          bg: "bg-[#f9f6f2]",

          // Input: light beige with dark brown text and muted placeholder
          inputBg:
            "bg-[#ece3d9] text-[#5a4632] placeholder-[#8c7b6b] shadow-md",

          // Add button: warm brown with white text and subtle hover
          buttonBg:
            "bg-[#b89b73] text-white hover:bg-[#a3875c] active:bg-[#8c6f4e]",

          // Each todo item: pale beige with dark brown text, shadow
          todoBg: "bg-[#e6d9c5] text-[#4d3d2f] shadow-md",

          // Todos container: slightly darker beige with matching text
          todoContainer: "bg-[#d6c5aa] text-[#4d3d2f] shadow-lg",
        }
      : {
          // Dark theme background
          bg: "bg-gray-900",

          // Input: dark gray background, light text, subtle shadow
          inputBg: "bg-gray-800 text-gray-100 placeholder-gray-400 shadow-md",

          // Add button: deep blue with white text, hover/active states
          buttonBg:
            "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",

          // Each todo item: dark gray background with white text, shadow
          todoBg: "bg-gray-800 text-white shadow-md",

          // Todos container: slightly darker gray container
          todoContainer: "bg-gray-700 text-white shadow-lg",
        };

  return (
    <div
      className={`container min-h-screen w-full flex items-center flex-col ${themeClasses.bg}`}
    >
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <div className="input w-full flex items-center justify-center px-4 mt-5">
        <input
          className={`w-full max-w-md outline-none border-none rounded-l-full py-4 px-4 font-medium text-sm sm:text-md shadow-md transition-colors duration-300
      ${themeClasses.inputBg} 
      ${theme === "dark" ? "placeholder-gray-400" : "placeholder-[#8c7b6b]"}`}
          onChange={handleChange}
          onKeyDown={handleEnter}
          value={todo}
          type="text"
          name="task"
          placeholder="What do you need to do?"
        />
        <button
          className={`outline-none border-none rounded-r-full h-13 w-14 sm:w-20 font-bold text-lg sm:text-xl cursor-pointer transition-colors duration-300
      ${
        todo.trim().length < 3
          ? theme === "light"
            ? "bg-[#d6c5aa] text-[#a3947b] cursor-not-allowed"
            : "bg-gray-700 text-gray-400 cursor-not-allowed"
          : themeClasses.buttonBg
      }
      ${
        todo.trim().length >= 3
          ? theme === "light"
            ? "hover:bg-[#a3875c] active:bg-[#8c6f4e]"
            : "hover:bg-blue-700 active:bg-blue-800"
          : ""
      }
    `}
          type="button"
          disabled={todo.trim().length < 3}
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      <div className="flex item-start justify-center gap-5 mt-3">
        <input
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
        />
        <span className={theme === "light" ? "text-black" : "text-white"}>
          Show Finished
        </span>
      </div>

      <div
        className={`todos w-full max-w-5xl min-h-[65vh] rounded-2xl p-4 sm:p-5 flex flex-col items-center gap-4 mt-6 ${themeClasses.todoContainer}`}
      >
        {todos.length === 0 && (
          <p
            className={`font-bold text-lg sm:text-2xl ${
              theme === "light" ? "text-white" : "text-gray-300"
            }`}
          >
            No todos yet.
          </p>
        )}
        {todos.map(
          (todoItem) =>
            (showFinished || !todoItem.isCompleted) && (
              <div
                key={todoItem.id}
                className={`todo w-full h-16 sm:h-20 rounded-2xl flex items-center justify-between px-4 shadow-md transition-colors duration-300 ${
                  theme === "light"
                    ? "bg-[#e6d9c5] text-[#4d3d2f]"
                    : "bg-gray-800 text-white"
                }`}
              >
                <div
                  className={`flex items-center w-full overflow-hidden space-x-3 ${
                    todoItem.isCompleted
                      ? theme === "light"
                        ? "line-through text-[#8c7b6b]"
                        : "line-through text-gray-400"
                      : theme === "light"
                      ? "text-[#4d3d2f]"
                      : "text-white"
                  }`}
                >
                  <input
                    type="checkbox"
                    name={todoItem.id}
                    checked={todoItem.isCompleted}
                    onChange={handleCheckbox}
                    className={`w-5 h-5 ${
                      theme === "light" ? "accent-[#b89b73]" : "accent-blue-500"
                    }`}
                  />
                  <span className="truncate text-sm sm:text-base font-medium">
                    {todoItem.todo}
                  </span>
                </div>

                <div className="btns flex shrink-0 space-x-2">
                  <button
                    onClick={() => handleEdit(todoItem.id)}
                    className={`edit cursor-pointer rounded-full h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center transition-colors duration-300 ${
                      theme === "light"
                        ? "bg-[#d6c5aa] hover:bg-[#cbb691] active:bg-[#b89b73]"
                        : "bg-gray-700 hover:bg-gray-600 active:bg-gray-500"
                    }`}
                  >
                    <FaEdit
                      className={`text-sm sm:text-base ${
                        theme === "light" ? "text-[#4d3d2f]" : "text-white"
                      }`}
                    />
                  </button>

                  <button
                    onClick={() => handleDelete(todoItem.id)}
                    className={`delete cursor-pointer rounded-full h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center transition-colors duration-300 ${
                      theme === "light"
                        ? "bg-[#d6c5aa] hover:bg-[#cbb691] active:bg-[#b89b73]"
                        : "bg-gray-700 hover:bg-gray-600 active:bg-gray-500"
                    }`}
                  >
                    <FaTrashAlt
                      className={`text-sm sm:text-base ${
                        theme === "light" ? "text-[#4d3d2f]" : "text-white"
                      }`}
                    />
                  </button>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default App;
