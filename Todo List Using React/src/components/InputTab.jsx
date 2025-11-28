import React from "react";

const inputTab = () => {
  return (
    <div>
      <div className="input w-full h-30 flex items-center justify-center">
        <input
          className="w-96 outline-none border-none bg-blue-300 rounded-l-full py-5 px-4 font-bold text-md"
          type="text"
          name="task"
          placeholder="What do you need to do?"
        />
        <button
          className="outline-none border-none bg-blue-500 rounded-r-full h-16 w-20 font-bold text-xl text-white"
          type="submit"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default inputTab;
