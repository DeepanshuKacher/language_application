import type { Metadata } from "next";
import "./globals.css";
import App from "./app";

export const metadata: Metadata = {
  title: "Learn language",
  description: "Created by Deepanshu Kacher",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <App>{children}</App>;
}
