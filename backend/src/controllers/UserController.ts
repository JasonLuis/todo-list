import { Request, Response, Next } from "restify";
import { UserServices } from "../services/UserServices";
import { v4 as uuidv4 } from 'uuid';

export class UserController {
  private userService: UserServices;

  constructor() {
    this.userService = new UserServices();
  }

  async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const result = await this.userService.createUser(
        {
            id: uuidv4(),
            name,
            email,
            password
        }
      );
      res.send(201, {
        name: result.name,
        email: result.email
      });
    } catch (error) {
      throw new Error("Error when creating a user: " + error);
    }
  }

  async auth(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        const result = await this.userService.auth(email, password);
        res.send(200, result);
    } catch (error) {
      throw error;
    }
  }
}
