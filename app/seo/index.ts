const DefaultSEO = {
  title: "Bondscape",
  description: "Create real bonds with engaging event experiences",
  metadataBase: new URL("https://bondscape.app"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    type: "website",
    url: "https://bondscape.app/",
    title: "Bondscape",
    description: "Create real bonds with engaging event experiences",
    images: [
      {
        url: "https://bondscape.app/cover.png",
        width: 1500,
        height: 500,
        alt: "Bondscape cover picture",
        type: "image/png",
      },
    ],
    siteName: "Bondscape",
  },
  twitter: {
    creator: "@bondscape",
    card: "summary_large_image",
    title: "Bondscape",
    description: "Create real bonds with engaging event experiences",
  },
  keywords: ["Events", "Experiences", "Web3", "Bondscape", "Desmos"],
}

export default DefaultSEO;
