import { ICreateTask } from "../interface/TasksInterface";
import { TasksRepository } from "../repositories/TasksRepository"

export class TasksServices {

    private taskRepository: TasksRepository;

    constructor() {
        this.taskRepository = new TasksRepository();
    }

    async createTask(task: ICreateTask) {
        const createTask = await this.taskRepository.createTask(task);
        
        return createTask;
    }

    async listAllTasks() {
        const listAllTasks = await this.taskRepository.listAllTasks();

        return listAllTasks;
    }

    async deleteTaskById(id: number) {
        const deleteTask = await this.taskRepository.deleteTaskById(id);

        return deleteTask;
    }

    async updateTaskById(task: { id: number, status: boolean}) {
        const updateTask = await this.taskRepository.updateTaskById(task);

        return updateTask;
    }
}