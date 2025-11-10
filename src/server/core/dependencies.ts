import { CreateUser, CreateUserController, LoginController, LoginUser, UserRepository } from "../api/api.js";
import { JWT } from "../core/services/jwt.js";

import { Hash } from "./services/hash.js";

// Servicios compartidos
const hashService = new Hash();
const jwtService = new JWT();
const userRepository = new UserRepository();

// Casos de uso
const createUser = new CreateUser(userRepository, hashService);
const loginUser = new LoginUser(userRepository, hashService, jwtService);

// Controladores
export const controllers = {
  createUser: new CreateUserController(createUser),
  login: new LoginController(loginUser),
};

// Exporta también servicios si necesitas inyectarlos en otros módulos
export const services = {
  hashService,
  jwtService,
  userRepository,
};
