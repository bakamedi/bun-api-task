import { CreateTask } from "../../application/create";

export class CreateTaskController {
  constructor(private createTask: CreateTask) {}

  public run() {
    try {
      const task = this.createTask.run();
      return {
        code: 200,
        task,
        message: "Task created",
      };
    } catch (e) {
        const error = e as Error;
      return {
        code: 400,
        message: error.message,
      };
    }
  }
}
