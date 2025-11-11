import { TaskRepository } from "../infrastructure/TaskRepository";
export class CreateTask {
  constructor(private taskRepository: TaskRepository) {}

  public run() {
    return this.taskRepository.create();
  }
}
