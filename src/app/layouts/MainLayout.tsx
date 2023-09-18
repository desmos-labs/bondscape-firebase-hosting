import React from "react";
import Head from "next/head";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import { Metadata, ResolvingMetadata } from "next";
import getPageSlur from "@/utils/getPageSlur";

export interface MainLayoutProps {
  readonly title: string;
  readonly description: string;
  readonly pageRoute: string;
  readonly children: React.ReactNode;
}

export async function generateMetadata(
  { title, description, pageRoute }: MainLayoutProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const pageSlur = getPageSlur(pageRoute);
  const pageUrl = `${process.env.NEXT_PUBLIC_HOST}${pageSlur}`;

  return {
    title: title,
    description: description,
    openGraph: {
      type: "website",
      url: pageUrl,
      title,
      description,
      siteName: "Bondscape",
    },
  };
}

const MainLayout = (props: MainLayoutProps) => {
  const { title, description, children } = props;

  return (
    <>
      {/* Meta information */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="../../../public/favicon.ico"
          type="image/x-icon"
        />
      </Head>
      {/* Main content */}
      <>
        <div className={`relative mx-auto w-full min-w-[375px]`}>
          <div className={`fixed top-0 w-full z-20`}>
            <div className="relative w-full min-w-[375px] max-w-[1920px] left-1/2 -translate-x-1/2">
              <NavigationBar />
            </div>
          </div>
          <main className="w-full">{children}</main>
          <div className={`relative w-full bg-no-repeat`}>
            <div
              className={`relative left-1/2 -translate-x-1/2 w-full min-w-[375px] max-w-[1920px] bg-no-repeat`}
            >
              <Footer />
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default MainLayout;
