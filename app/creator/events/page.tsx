"use client";
import MainLayout from "../../layouts/MainLayout";
import React, { Suspense } from "react";
import { useSuspenseQuery } from "@apollo/client";
import GetEvents from "../../services/graphql/queries/bondscape/GetEvents";

export default function Events() {
  const { data, fetchMore } = useSuspenseQuery<{
    events: any[];
  }>(GetEvents, {
    variables: {
      offset: 0,
      limit: 2,
    },
    fetchPolicy: "no-cache",
  });

  return (
    <MainLayout backgroundImage={true}>
      <div className="relative items-center w-full h-screen min-h-mobile md:min-h-md lg:min-h-lg xl:min-h-xl">
        <div className="flex flex-col items-center relative h-full md:h-screen md:justify-center mt-16 md:mt-0">
          <Suspense>
            {data?.events.map((event) => (
              <div key={event.name} className="text-white">
                {event.name}
              </div>
            ))}
          </Suspense>
        </div>
      </div>
    </MainLayout>
  );
}
