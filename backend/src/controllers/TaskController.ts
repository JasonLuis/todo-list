import { Request, Response, Next } from "restify";
import { TaskServices } from "../services/TaskServices";
import { v4 as uuidv4 } from 'uuid';


export class TaskController {
  private taskServices: TaskServices;

  constructor() {
    this.taskServices = new TaskServices();
  }

  async createTask(req: Request, res: Response) {
    const { title, description } = req.body;
    const { user_id } = <any>req;
    
    const createdAt = new Date().toISOString();
    const status = false;
    try {
      const result = await this.taskServices.createTask(user_id, {
        id: uuidv4(),
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
    const { user_id } = <any>req;

    try {
      const result = await this.taskServices.listAllTasks(user_id);

      res.send(200, result);
    } catch (error) {
      throw new Error("Error listing tasks: " + error);
    }
  }

  async listTasksByStatus(req: Request, res: Response) {
    const { user_id } = <any>req;

    try {
      const { status } = req.body;
      const result = await this.taskServices.listTasksByStatus(user_id, status);

      res.send(200, result);
    } catch (error) {
      throw new Error("Error listing tasks: " + error);
    }
  }

  async deleteTaskById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { user_id } = <any>req;
      const result = await this.taskServices.deleteTaskById(user_id, id);

      res.send(200, { 
        message: "task deleted"
      });
    } catch (error) {
      throw new Error("Error when deleting a task: " + error);
    }
  }

  async updateTaskById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { user_id } = <any>req;
      const { status } = req.body;
      const result = await this.taskServices.updateTaskById(user_id, { id, status });

      res.send(200, result);
    } catch (error) {
      throw new Error("Error when updating a task: " + error);
    }
  }

}
