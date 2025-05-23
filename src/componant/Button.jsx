import React from "react";

const Button = ({ onClick, btntext }) => {
  return (
    <button
      className="w-full h-10 bg-indigo-600 text-white flex items-center justify-center mt-4 rounded-md border-none"
      onClick={onClick}
    >
      {btntext}
    </button>
  );
};

export default Button;
