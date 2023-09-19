import React from "react";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>
      {/* Main content */}
      <body className="bg-bondscape-background-primary">
        <div className={`relative mx-auto w-full min-w-[375px]`}>
          {children}
          <div className={`relative w-full min-w-[375px] bg-no-repeat`}>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
