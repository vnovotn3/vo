"use client";

export default function Input({ isValid = true, ...props }) {
  return (
    <input
      autoComplete={props.type == "password" ? "current-password" : props.type}
      className={`block w-full rounded-md py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
        isValid
          ? "border-0 ring-1 ring-inset ring-gray-300"
          : "border-red-500 ring-1 ring-inset ring-red-300"
      }`}
      {...props}
    />
  );
}
