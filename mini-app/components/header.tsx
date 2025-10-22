"use client";

import Link from "next/link";
import { title } from "@/lib/metadata";

export function Header() {
  return (
    <header className="sticky flex items-center justify-between border-b p-4">
      <Link href="/">
        <div className="flex items-center gap-2">
          <img src="/icon.png" alt="icon" width={40} height={40} className="size-10" />
          <span className="text-xl font-bold">{title}</span>
        </div>
      </Link>
    </header>
  );
}
