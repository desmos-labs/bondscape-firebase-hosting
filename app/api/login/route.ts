import { createResponse, getSession } from "@/lib/session";
import { NextRequest } from "next/server";
import axiosInstance from "@/services/axios";
import { User } from "@/types/user";

/**
 * POST /api/login
 * @param request - The incoming request
 */
export async function POST(request: NextRequest) {
  // Create a new response
  const response = new Response();
  // Get the session
  const session = await getSession(request, response);
  // Get the user from the request body and store it in the session
  const user = (await request.json()) as User;
  session.user = user;
  // Set the authorization header for the axios instance
  axiosInstance.defaults.headers.common = {
    Authorization: user.bearer,
  };
  // Save the session
  await session.save();
  return createResponse(
    response,
    JSON.stringify({ message: "New session with user created" }),
  );
}
