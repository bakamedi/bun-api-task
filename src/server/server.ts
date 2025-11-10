import { Elysia } from "elysia";
import { userRouter } from "./core/api/user/router/userRouter";

export class Server {
  private app: Elysia;
  constructor() {
    this.app = new Elysia();
    this.app.derive(({ headers }) => {
      const auth = headers["authorization"];
      return {
        token: auth?.startsWith("Bearer ") ? auth.slice(7) : null,
      };
    });
    this.app.group("/api/v1", (app) => app.use(userRouter));
  }

  public start(): void {
    this.app.listen(process.env.PORT || 3000, () => {
      console.log("Server is running on yor PORT 3000");
    });
  }
}
