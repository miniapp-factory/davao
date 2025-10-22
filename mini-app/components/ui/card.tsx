import * as React from "react";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={`bg-white rounded-xl shadow-md p-6 ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={`mb-4 ${className}`} {...props} />;
}

export function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <h3 className={`text-xl font-semibold ${className}`} {...props} />;
}

export function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={`mt-4 ${className}`} {...props} />;
}

export function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={`mt-6 ${className}`} {...props} />;
}
