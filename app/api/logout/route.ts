import { createResponse, getSession } from "@/lib/session";
import { NextRequest } from "next/server";
import axiosInstance from "@/services/axios";

/**
 * POST /api/logout
 * @param request - The incoming request
 */
export async function POST(request: NextRequest) {
  // Create a new response
  const response = new Response();
  // Get the session
  const session = await getSession(request, response);
  // Clear axios authorization header
  axiosInstance.defaults.headers.common = {
    Authorization: "",
  };
  // Destroy the session
  await session.destroy();
  return createResponse(
    response,
    JSON.stringify({ message: "Logged out from session" }),
  );
}
