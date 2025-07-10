import * as React from "react";
import { cn } from "@/lib/utils";

const Sheet = ({ children, open, onOpenChange }: { children: React.ReactNode; open: boolean; onOpenChange: (open: boolean) => void }) => {
  return (
    <div>
      {children}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => onOpenChange(false)} />
      )}
    </div>
  );
};

const SheetTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
  }
>(({ className, children, asChild = false, ...props }, ref) => {
  if (asChild) {
    return React.cloneElement(children as React.ReactElement, { ...props });
  }
  return (
    <button
      className={cn(className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});
SheetTrigger.displayName = "SheetTrigger";

const SheetContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed inset-y-0 right-0 z-50 h-full w-3/4 max-w-sm border-l bg-background p-6 shadow-lg transition-transform duration-300 sm:max-w-sm",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
SheetContent.displayName = "SheetContent";

export { Sheet, SheetTrigger, SheetContent };
