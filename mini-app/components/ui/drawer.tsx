import * as React from "react";

export function Drawer({ children, ...props }: React.ComponentProps<"div">) {
  return <div {...props}>{children}</div>;
}
export function DrawerTrigger({ children, ...props }: React.ComponentProps<"button">) {
  return <button {...props}>{children}</button>;
}
export function DrawerContent({ children, ...props }: React.ComponentProps<"div">) {
  return <div {...props}>{children}</div>;
}
export function DrawerClose({ children, ...props }: React.ComponentProps<"button">) {
  return <button {...props}>{children}</button>;
}
