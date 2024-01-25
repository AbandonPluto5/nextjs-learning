"use client";
// app/layout.js
import "./globals.css";
import Link from "next/link";
export default function RootLayout({ children, auth }) {
  return (
    <html>
      <body>
        <div>
          <Link href="/login">Open Auth Modal</Link>
        </div>
        <div>
          <Link href="/">Back To Home</Link>
        </div>
        <h1>/app/layout.js</h1>
        {children}
        {auth}
      </body>
    </html>
  );
}
