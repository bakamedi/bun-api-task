import { Elysia } from "elysia";
import { controllers } from "../../../core/dependencies";
import { createUserDTO, loginUserDTO } from "../domain/userDTO";

export const userRouter = new Elysia({
  prefix: "/users",
})
  .post(
    "/",
    controllers.createUser.run.bind(controllers.createUser),
    createUserDTO
  )
  .post("/login", controllers.login.run.bind(controllers.login), loginUserDTO);
