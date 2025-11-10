import bcrypt from "bcrypt";
import type { IHash } from "./interfaces/IHash.js";

export class Hash implements IHash {
  public async hash(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync(10);
    return await bcrypt.hash(password, salt);
  }

  public async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
