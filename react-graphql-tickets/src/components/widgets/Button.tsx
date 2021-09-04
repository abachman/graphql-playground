import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <button
      {...props}
      type="button"
      className={`${className} border rounded border-gray-600 p-2 bg-gray-200 active:bg-gray-400`}
    />
  );
};
