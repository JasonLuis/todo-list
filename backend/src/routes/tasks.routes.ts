import { Server } from "restify";
import { TaskController } from "../controllers/TaskController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

export class TasksRoutes {
  private server: Server;
  private tasksController: TaskController;
  private authMiddleware: AuthMiddleware;
  constructor(server: Server) {
    this.server = server;
    this.tasksController = new TaskController();
    this.authMiddleware = new AuthMiddleware();
  }

  getRoutes() {
    this.server.post(
      "/tasks/",
      this.authMiddleware.auth.bind(this.authMiddleware),
      this.tasksController.createTask.bind(this.tasksController)
    );

    this.server.get(
      "/tasks",
      this.authMiddleware.auth.bind(this.authMiddleware),
      this.tasksController.listAllTasks.bind(this.tasksController)
    );

    this.server.post(
      "/tasks/status",
      this.authMiddleware.auth.bind(this.authMiddleware),
      this.tasksController.listTasksByStatus.bind(this.tasksController)
    );

    this.server.del(
      "/tasks/:id",
      this.authMiddleware.auth.bind(this.authMiddleware),
      this.tasksController.deleteTaskById.bind(this.tasksController)
    );

    this.server.put(
      "/tasks/:id",
      this.authMiddleware.auth.bind(this.authMiddleware),
      this.tasksController.updateTaskById.bind(this.tasksController)
    );

    /* this.server.get(
      "/tasks/teste",
      this.authMiddleware.auth.bind(this.authMiddleware),
      this.tasksController.teste.bind(this.tasksController)
    ); */
  }
}
