"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Create simple avatar components that don't depend on Radix UI
const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement> & {
    onLoadingStatusChange?: (status: "loading" | "loaded" | "error") => void
  }
>(({ className, onLoadingStatusChange, ...props }, ref) => {
  const [status, setStatus] = React.useState<"loading" | "loaded" | "error">("loading")
  
  const handleLoadingStatusChange = (newStatus: "loading" | "loaded" | "error") => {
    setStatus(newStatus)
    onLoadingStatusChange?.(newStatus)
  }
  
  return (
    <img
      ref={ref}
      onLoad={() => handleLoadingStatusChange("loaded")}
      onError={() => handleLoadingStatusChange("error")}
      className={cn("aspect-square h-full w-full", className)}
      {...props}
    />
  )
})
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback } 