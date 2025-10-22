import * as React from "react";

export function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<"div"> & { value: number }) {
  const percent = Math.min(Math.max(value, 0), 100);
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`} {...props}>
      <div
        className="bg-blue-600 h-full rounded-full transition-all"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
