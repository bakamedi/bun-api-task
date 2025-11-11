import {
  CreateUser,
  CreateUserController,
  LoginController,
  LoginUser,
  UserRepository,
} from "../api/api.js";
import { CreateTask } from "../api/task/application/create.js";
import { JWT } from "../core/services/jwt.js";

import { Hash } from "./services/hash.js";
import { TaskRepository } from '../api/task/infrastructure/TaskRepository';
import { CreateTaskController } from "../api/task/infrastructure/controllers/createController.js";

// Servicios compartidos
const hashService = new Hash();
const jwtService = new JWT();
const userRepository = new UserRepository();

// Casos de uso
const createUser = new CreateUser(userRepository, hashService);
const loginUser = new LoginUser(userRepository, hashService, jwtService);


// caso de usos TASK
const taskRepository = new TaskRepository();
const createTask = new CreateTask(taskRepository);

// Controladores
export const controllers = {
  createUser: new CreateUserController(createUser),
  login: new LoginController(loginUser),
  createTask: new CreateTaskController(createTask),
};

// Exporta también servicios si necesitas inyectarlos en otros módulos
export const services = {
  hashService,
  jwtService,
  userRepository,
};
