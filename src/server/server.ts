import { Elysia } from "elysia";
import { userRouter, tasksRouter } from "./api/api";
import { JWT } from "./core/services/jwt";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";

export class Server {
  private app: Elysia;
  private jwtService: JWT;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.jwtService = new JWT();
    this.authMiddleware = new AuthMiddleware(this.jwtService);
    this.app = new Elysia();

    // Extrae token del header
    this.app.derive(({ headers }) => {
      const auth = headers["authorization"];
      const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
      return { token };
    });

    // Registra el middleware OOP
    this.authMiddleware.register(this.app);

    // Agrupa las rutas
    this.app.group("/api/v1", (app) => app.use(userRouter).use(tasksRouter));
  }


  public start(): void {
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`);
    });
  }
}
