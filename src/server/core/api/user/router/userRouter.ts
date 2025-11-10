import { Elysia } from "elysia";
import { createUserContoller, loginController } from "../../../dependencies";
import { createUserDTO, loginUserDTO } from "../domain/userDTO";

export const userRouter = new Elysia({
  prefix: "/users",
})
  .post("/", createUserContoller.run.bind(createUserContoller), createUserDTO)
  .post("/login", loginController.run.bind(loginController), loginUserDTO);
