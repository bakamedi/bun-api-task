import { UserRepository } from "./api/user/infrastructure/UserRepository.js";
import { CreateUser } from "./api/user/application/create.js";
import { CreateUserController } from "./api/user/infrastructure/controllers/createController.js";
import { Hash } from "../core/services/hash.js";
import { LoginUser } from "./api/user/application/login.js";
import { LoginController } from "./api/user/infrastructure/controllers/loginController.js";
import { JWT } from "../core/services/jwt.js";

const userRepository = new UserRepository();
const hashService = new Hash();
const createUser = new CreateUser(userRepository, hashService);
const jwtService = new JWT();

export const createUserContoller = new CreateUserController(createUser);

const loginUser = new LoginUser(userRepository, hashService, jwtService);
export const loginController = new LoginController(loginUser);
