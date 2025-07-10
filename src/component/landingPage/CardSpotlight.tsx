import * as React from "react";
import { cn } from "@/lib/utils";

export const CardSpotlight = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative rounded-xl border bg-card text-card-foreground shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/20",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
CardSpotlight.displayName = "CardSpotlight";
