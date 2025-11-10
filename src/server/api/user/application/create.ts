
import { IHash } from "../../../core/services/interfaces/IHash";
import { IUser } from "../domain/IUser";

export class CreateUser {
  constructor(private userRepository: IUser, private hash: IHash) {}

  public async run(email: string, name: string, password: string) {
    const hashedPassword = await this.hash.hash(password);
    return await this.userRepository.create(email, name, hashedPassword);
  }
}
