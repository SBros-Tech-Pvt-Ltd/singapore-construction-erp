import * as React from "react";
import { cn } from "@/lib/utils";

type CardColor =
  | "blue"
  | "green"
  | "orange"
  | "pink"
  | "purple"
  | "yellow"
  | "default";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: CardColor;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, color = "default", ...props }, ref) => {
    const colorClass =
      color === "default"
        ? "bg-card text-card-foreground border border-card-border"
        : `bg-[hsl(var(--card-${color}))] text-white shadow-lg`;

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl transition-all duration-300 hover:scale-[1.02]",
          colorClass,
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm opacity-90", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
