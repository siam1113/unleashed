"use client";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  color: string;
}

export const Button = ({ children, color, ...props }: any) => {
  return (
    <button className={color} {...props}>
      {children}
    </button >
  );
};
