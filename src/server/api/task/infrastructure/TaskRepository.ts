import { PrismaClient } from "../../../../generated/prisma/client";
import { ITask } from "../domain/ITask";
import { Task } from "../domain/Task";

export class TaskRepository implements ITask {
  private db: PrismaClient;
  constructor() {
    this.db = new PrismaClient();
  }
  public create(): Task {
    return new Task('1', 'titulo', 'description');
  }
}
