"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Create a simple switch component that doesn't depend on Radix UI
const Switch = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    checked?: boolean
    onCheckedChange?: (checked: boolean) => void
  }
>(({ className, checked = false, onCheckedChange, ...props }, ref) => {
  const [isChecked, setIsChecked] = React.useState(checked)
  
  React.useEffect(() => {
    setIsChecked(checked)
  }, [checked])
  
  const handleClick = React.useCallback(() => {
    const newValue = !isChecked
    setIsChecked(newValue)
    onCheckedChange?.(newValue)
  }, [isChecked, onCheckedChange])
  
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      data-state={isChecked ? "checked" : "unchecked"}
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        className
      )}
      onClick={handleClick}
      ref={ref}
      {...props}
    >
      <span
        data-state={isChecked ? "checked" : "unchecked"}
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )}
      />
    </button>
  )
})

Switch.displayName = "Switch"

export { Switch } 