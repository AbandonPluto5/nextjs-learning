"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const [count, setCount] = useState(0);
  const router = useRouter();
  return (
    <>
      <div>
        <Link href="/dashboard/about">About</Link>
        <br />
        <Link href="/dashboard/settings">Settings</Link>
        <button onClick={() => router.push("/dashboard/blog")}>toBlog</button>
      </div>
      <h1>Layout {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      {children}
    </>
  );
}
