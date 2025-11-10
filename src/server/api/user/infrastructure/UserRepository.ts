import { PrismaClient } from "../../../../generated/prisma/client.js";
import { IUser } from "../domain/IUser.js";
import { User } from "../domain/User.js";

export class UserRepository implements IUser {
  private db: PrismaClient;
  constructor() {
    this.db = new PrismaClient();
  }
  public async find(email: string): Promise<User | null> {
    const user = await this.db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return null;
    }
    return new User(user.id, user.email, user.name, user.hashedPassword);
  }
  public async create(
    email: string,
    name: string,
    password: string
  ): Promise<User> {
    const user = await this.db.user.create({
      data: {
        email,
        name,
        hashedPassword: password,
      },
      select: { id: true, email: true, name: true },
    });

    return new User(user.id, user.email, user.name);
  }
}
