export class User {
  constructor(
    public id: string,
    public email: string,
    public name: string,
    public hashedPassword?: string,
    public token?: string
  ) {}

  setToken(token: string): void {
    this.token = token;
  }
}
