import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export const middleware = async (request: NextRequest) => {
  const response = new Response();
  const session = await getSession(request, response);
  const { user } = session;

  /*  const result = await fetch(
    "https://api-bondscape.mainnet.desmos.network/session",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user?.bearer}`,
      },
    },
  );

  if (result.status === 401) {
    await session.destroy();
    destroyCookie(null, "bearer_token");
  }*/

  if (request.nextUrl.pathname === "/creator/*") {
    if (!user) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
};
