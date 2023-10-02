import React from "react";
import DefaultSEO from "../../seo";
import Script from "next/script";

export const metadata = {
  ...DefaultSEO,
  title: "Create event",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Script
        defer={true}
        id="google-maps"
        type="text/javascript"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places&callback=getPlaces`}
      />
      {children}
    </div>
  );
}
