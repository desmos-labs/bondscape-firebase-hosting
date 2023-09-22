import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export const middleware = async (request: NextRequest) => {
  const response = new Response();
  const session = await getSession(request, response);
  const { user } = session;
  if (request.nextUrl.pathname === "/creator/events") {
    if (!user) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (request.nextUrl.pathname === "/creator/login") {
    if (user) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
};

export const config = {
  matcher: "/creator/:path*",
};
