import Link from "next/link";
import React, { ButtonHTMLAttributes, JSX } from "react";

const Button = ({
  el,
  text,
  type,
  onClick,
  color,
}: {
  el?: React.ReactNode;
  text: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: () => void;
  color?: string;
}) => {
  return (
    <div>
      <button
        onClick={onClick}
        type={type || "button"}
        className={`inline-flex w-full items-center px-3 py-2 text-sm font-medium text-center text-white ${
          color || "bg-red-800"
        } rounded-lg ${
          color || "hover:bg-blue-800"
        } focus:ring-4 focus:outline-none focus:ring-blue-300 ${
          color || "dark:bg-blue-600"
        } ${color || "dark:hover:bg-blue-700"} ${
          color || "dark:focus:ring-blue-800"
        }`}
      >
        <div className="m-auto flex items-center">
          {text} {el}
        </div>
      </button>
    </div>
  );
};

export default Button;
