import React from "react";

export function Button({ children, asChild = false, className }) {
  if (asChild) {
    return React.cloneElement(children, {
      className:
        "bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded " +
        (children.props.className || "")
    });
  }
  return (
    <button
      className={
        "bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded " +
        (className || "")
      }
    >
      {children}
    </button>
  );
}
