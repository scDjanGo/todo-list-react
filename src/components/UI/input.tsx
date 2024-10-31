"use client";
import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  type?: string;
}

const Input: FC<InputProps> = ({
  name = "",
  type = "text",
  className,
  ...rest
}) => {
  return (
    <input
      className={`px-[10px] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 ${className}`}
      type={type}
      name={name}
      id={name}
      {...rest}
    />
  );
};

export default Input;
