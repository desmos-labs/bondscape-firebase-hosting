import React from "react";
import "../../globals.css";

export const metadata = {
  title: "Bondscape | Login",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
