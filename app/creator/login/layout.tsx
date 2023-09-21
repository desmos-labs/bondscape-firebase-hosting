import React from "react";
import "../../globals.css";
import DefaultSEO from "../../seo";

export const metadata = {
  ...DefaultSEO,
  title: "Login | Bondscape",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
