"use client";
import { forwardRef } from "react";
import clsx from "clsx";

interface DashboardButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  active?: boolean;
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const DashboardButton = forwardRef<HTMLButtonElement, DashboardButtonProps>(
  ({ children, active, icon, trailingIcon, className, ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(
        "cursor-pointer w-full text-left px-4 py-2 rounded-lg font-medium transition-colors duration-200",
        "bg-transparent text-gray-700 dark:text-gray-200",
        "hover:bg-blue-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300",
        active && "bg-gray-50 dark:bg-gray-950 text-gray-700 dark:text-gray-300",
        className
      )}
      {...props}
    >
      <span className="flex items-center justify-between w-full">
        <span className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </span>
        {trailingIcon && <span className="ml-2">{trailingIcon}</span>}
      </span>
    </button>
  )
);

DashboardButton.displayName = "DashboardButton";
export default DashboardButton;
