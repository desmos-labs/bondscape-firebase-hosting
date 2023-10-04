import React from "react";
import DefaultSEO from "@/seo";

export const metadata = {
  ...DefaultSEO,
  title: "Event",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
