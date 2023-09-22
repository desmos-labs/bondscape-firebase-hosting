import { createResponse, getIronSession } from "iron-session";
import { User } from "@/types/user";

export const getSession = (req: Request, res: Response) => {
  return getIronSession<{
    user?: User;
  }>(req, res, {
    password: "ThisIsNotASecurePasswordPleaseChangeIt",
    cookieName: "session",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });
};

export { createResponse };
