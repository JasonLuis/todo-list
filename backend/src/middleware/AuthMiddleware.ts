import { Next, Request, Response } from "restify";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

interface IPayload {
  sub: string;
}

export class AuthMiddleware {
  auth(req: Request, res: Response, next: Next) {
    const auth = req.headers.authorization;
    if (!auth) {
      return res.send(401, {
        code: "token.missing",
        message: "Token missing",
      });
    }

    const [, token] = auth.split(" ");
    let key: string | undefined = process.env.JW_KEY_TOKEN; // 
    if (!key) {
      throw new Error("There is no token key");
    }
    
    try {
      const { sub } = verify(token, key) as IPayload;
      (<any>req).user_id = sub;
      return next();
    } catch (error) {
      return res.send(401, {
        code: "token.invalid",
        message: "Invalid token",
      });
    }
  }
}