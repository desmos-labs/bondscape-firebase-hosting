import { getSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/user
 * @param request - The incoming request
 */
export async function GET(request: NextRequest) {
  const response = new Response();
  const session = await getSession(request, response);
  if (session.user) {
    return NextResponse.json({
      ...session.user,
      isLoggedIn: true,
    });
  } else {
    return NextResponse.json({
      profile: undefined,
      account: undefined,
      bearer: "",
      isLoggedIn: false,
    });
  }
}
