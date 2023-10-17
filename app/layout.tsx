import ToastWrapper from "@/components/ToastWrapper";
import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { ApolloWrapper } from "./components/ApolloWrapper";
import BondscapeWrapper from "./components/BondscapeWrapper";
import Footer from "./components/Footer";
import JotaiProvider from "./components/JotaiProvider";
import "./globals.css";
import "./theme.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Main content */}
      <body
        className="bg-bondscape-background-primary"
        suppressHydrationWarning={true}
      >
        <JotaiProvider>
          <ApolloWrapper>
            <ToastWrapper>
              <div className="relative mx-auto w-full min-w-[375px]">
                <BondscapeWrapper>{children}</BondscapeWrapper>
                <div className={`relative w-full min-w-[375px] bg-no-repeat`}>
                  <Footer />
                </div>
              </div>
            </ToastWrapper>
          </ApolloWrapper>
        </JotaiProvider>
      </body>
    </html>
  );
}
