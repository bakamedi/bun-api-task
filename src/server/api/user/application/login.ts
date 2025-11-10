import { IHash } from "../../../core/services/interfaces/IHash";
import { IJWT } from "../../../core/services/interfaces/IJWT";
import { IUser } from "../domain/IUser";

export class LoginUser {
  constructor(
    private userRepository: IUser,
    private hash: IHash,
    private jwt: IJWT
  ) {}

  public async run(email: string, password: string) {
    const user = await this.userRepository.find(email);
    if (!user) throw new Error("User not found");
    const isValid = await this.hash.compare(
      password,
      user.hashedPassword as string
    );
    if (!isValid) throw new Error("Invalid password");
    const token = this.jwt.sign(user.id);
    user.setToken(token);
    const { hashedPassword, ...safeUser } = user;
    return safeUser;
  }
}
