import { Server } from "restify";
import { TaskController } from "../controllers/TasksController";

export class TasksRoutes {
  private server: Server;
  private tasksController: TaskController;
  constructor(server: Server) {
    this.server = server;
    this.tasksController = new TaskController();
  }

  getRoutes() {
    this.server.post("/tasks", this.tasksController.createTask.bind(this.tasksController));

    this.server.get("/tasks", this.tasksController.listAllTasks.bind(this.tasksController));

    this.server.del("/tasks/:id", this.tasksController.deleteTaskById.bind(this.tasksController));

    return this.server;
  }
}
