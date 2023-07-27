import { Request, Response, Next } from "restify";
import { TasksServices } from "../services/TasksServices";

export class TaskController {
  private tasksServices: TasksServices;

  constructor() {
    this.tasksServices = new TasksServices();
  }

  async createTask(req: Request, res: Response) {
    const { title, description } = req.body;
    const createdAt = new Date().toISOString();
    const status = false;
    try {
      const result = await this.tasksServices.createTask({
        title,
        description,
        createdAt,
        status,
      });
      res.send(201, result);
    } catch (error) {
      throw new Error("Error when creating a task: " + error);
    }
  }

  async listAllTasks(req: Request, res: Response) {
    try {
      const result = await this.tasksServices.listAllTasks();

      res.send(200, result);
    } catch (error) {
      throw new Error("Error listing tasks: " + error);
    }
  }

   async deleteTaskById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.tasksServices.deleteTaskById(id);

      res.send(200, result);
    } catch (error) {
      throw new Error("Error when deleting a task: " + error);
    }
   }

   async updateTaskById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;  
      const result = await this.tasksServices.updateTaskById({ id, status});

      res.send(200, result);
    } catch (error) {
      throw new Error("Error when updating a task: " + error);
    }
   }
}
