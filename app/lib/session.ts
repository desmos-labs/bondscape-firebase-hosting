import { createResponse, getIronSession } from "iron-session";
import { User } from "@/types/user";

export const getSession = (req: Request, res: Response) => {
  return getIronSession<{
    user?: User;
  }>(req, res, {
    password: process.env.NEXT_PUBLIC_COOKIES_STORAGE_PASSWORD,
    cookieName: "session",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });
};

export { createResponse };
