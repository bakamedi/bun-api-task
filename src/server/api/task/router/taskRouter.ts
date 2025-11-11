import { Elysia } from "elysia";
import { controllers } from "../../../core/dependencies";

export const tasksRouter = new Elysia({
  prefix: "/tasks",
}).post("/", controllers.createTask.run.bind(controllers.createTask));
