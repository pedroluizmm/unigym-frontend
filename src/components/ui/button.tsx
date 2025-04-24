import { ButtonHTMLAttributes, forwardRef } from "react"
import clsx from "clsx"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const baseStyles = "px-4 py-2 rounded font-medium transition-all"
    const variants = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      outline: "border border-gray-400 text-gray-800 hover:bg-gray-200",
      ghost: "text-gray-800 hover:bg-gray-100",
    }

    return (
      <button
        ref={ref}
        className={clsx(baseStyles, variants[variant], className)}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"
