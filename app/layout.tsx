import React from "react";
import Footer from "./components/Footer";
import Head from "next/head";
import "./globals.css";
import BondscapeWrapper from "./components/BondscapeWrapper";
import RecoilContextProvider from "./components/RecoilContextProvider";
import { ApolloWrapper } from "./components/ApolloWrapper";
import Script from "next/script";

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
      <body
        className="bg-bondscape-background-primary"
        suppressHydrationWarning={true}
      >
        <Script
          id="google-maps"
          type="text/javascript"
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places&callback=getPlaces`}
        />
        <div className="relative mx-auto w-full min-w-[375px]">
          <RecoilContextProvider>
            <ApolloWrapper>
              <BondscapeWrapper>{children}</BondscapeWrapper>
            </ApolloWrapper>
          </RecoilContextProvider>
          <div className={`relative w-full min-w-[375px] bg-no-repeat`}>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
