import type { Elysia, Context } from "elysia";
import { JWT } from "../core/services/jwt";

export class AuthMiddleware {
  private jwtService: JWT;
  private publicRoutes: string[];

  constructor(jwtService: JWT) {
    this.jwtService = jwtService;
    this.publicRoutes = ["/api/v1/users", "/api/v1/users/login"];
  }

  public register(app: Elysia): void {
    app.onBeforeHandle(async (ctx: Context) => {
      const path = ctx.path;
      const set = ctx.set;

      // Extraer token del header Authorization "Bearer <token>" o de la cookie 'token'
      const authHeader = (ctx.headers as Record<string, string | undefined>)['authorization'] ?? (ctx.headers as Record<string, string | undefined>)['Authorization'];
      const tokenFromHeader = authHeader ? authHeader.split(' ')[1] : undefined;
      const tokenFromCookie = (ctx.cookie && (ctx.cookie as Record<string, any>)['token']) ? (ctx.cookie as Record<string, any>)['token'].value : undefined;
      const token = tokenFromHeader ?? tokenFromCookie;


      // Si la ruta es pública, no se valida el token
      if (this.isPublicRoute(path)) return;

      if (!token) {
        set.status = 401;
        return { message: "Token no proporcionado" };
      }

      try {
        const payload = await this.jwtService.verify(token);
        // Añadir datos del usuario al contexto
        (ctx.store as any).user = payload;
      } catch {
        set.status = 401;
        return { message: "Token inválido o expirado" };
      }
    });
  }

  private isPublicRoute(path: string): boolean {
    return this.publicRoutes.includes(path);
  }
}