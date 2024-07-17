"use client";

export default function Button({ type, onClick, isFullWidth, label, classes }) {
  return (
    <button
      onClick={onClick}
      className={`${
        isFullWidth ? "flex w-full" : ""
      } justify-center px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded-md ${
        type === "primary"
          ? "text-white bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
          : type === "border"
          ? "bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 shadow"
          : ""
      }`}
    >
      {label}
    </button>
  );
}
