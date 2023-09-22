"use client";
import MainLayout from "../../layouts/MainLayout";
import React, { Suspense } from "react";
import { useSuspenseQuery } from "@apollo/client";
import GetEvents from "../../services/graphql/queries/bondscape/GetEvents";
import bgOverlay from "../../../public/eventsBgOverlay.png";

export default function Events() {
  const { data } = useSuspenseQuery<{
    events: any[];
  }>(GetEvents, {
    variables: {
      offset: 0,
      limit: 2,
    },
    fetchPolicy: "no-cache",
  });

  return (
    <MainLayout customClasses={"bg-[#020014]"} backgroundOverlay={bgOverlay}>
      <div className="flex flex-col relativerelative items-center justify-center h-screen w-full">
        <Suspense>
          {data?.events.map((event) => (
            <div key={event.name} className="text-white">
              {event.name}
            </div>
          ))}
        </Suspense>
      </div>
    </MainLayout>
  );
}
