import * as React from "react"
import { cn } from "@/lib/utils"

export function ShineBorder({
  borderWidth = 1,
  duration = 14,
  shineColor = "#000000",
  className,
  style,
  ...props
}) {
  const colors = Array.isArray(shineColor) ? shineColor.join(", ") : shineColor

  return (
    <div
      style={{
        padding: `${borderWidth}px`,
        background: `linear-gradient(var(--angle, 0deg), transparent 20%, ${colors}, transparent 80%)`,
        borderRadius: "inherit",
        position: "absolute",
        inset: 0,
        animation: `borderRotate ${duration}s linear infinite`,
        WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
        mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        pointerEvents: "none",
        ...style
      }}
      className={cn("will-change-transform", className)}
      {...props}
    />
  )
}
