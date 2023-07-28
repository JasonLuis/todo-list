import { compare, hash } from "bcrypt";
import { IUser } from "../interface/UserInterface";
import { UserRepository } from "../repositories/UserRepository";
import { sign } from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

export class UserServices {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser({ id, name, email, password }: IUser) {
    const hashPassword = await hash(password, 10);
    const user = {
      id,
      name,
      email,
      password: hashPassword,
    };
    const createUser = await this.userRepository.createUser(user);

    return createUser;
  }

  async auth(email: string, password: string) {
    const findUser = await this.userRepository.findUserByEmail(email);

    if (!findUser) {
      throw new Error("User or password invalid");
    }

    const passwordMatch = await compare(password, `${findUser.password}`);

    if (!passwordMatch) {
      throw new Error("User or password invalid");
    }

    let key: string | undefined = process.env.JW_KEY_TOKEN;
    if (!key) {
      throw new Error("There is no token key");
    }

    const token = sign({ email }, key, {
      subject: findUser.id,
      expiresIn: 60 * 15,
    });

    return {
      token,
      user: {
        name: findUser.name,
        email: findUser.email,
      },
    };
  }
}
