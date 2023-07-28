import { ITask } from "../interface/TaskInterface";
import { TasksRepository } from "../repositories/TaskRepository"

export class TaskServices {

    private taskRepository: TasksRepository;

    constructor() {
        this.taskRepository = new TasksRepository();
    }

    async createTask(idUser: number ,task: ITask) {
        const createTask = await this.taskRepository.createTask(idUser, task);

        return createTask;
    }

    async listAllTasks(idUser: string) {
        const listAllTasks = await this.taskRepository.listAllTasks(idUser);

        return listAllTasks;
    }

    async listTasksByStatus(idUser: string, status: boolean) {
        const listTasksByStatus = await this.taskRepository.listTasksByStatus(idUser, status);

        return listTasksByStatus;
    }

    async deleteTaskById(idUser: string, idTask: number) {
        const deleteTask = await this.taskRepository.deleteTaskById(idUser, idTask);

        return deleteTask;
    }

    async updateTaskById(idUser: string,task: { id: number, status: boolean}) {
        const updateTask = await this.taskRepository.updateTaskById(idUser, task);

        return updateTask;
    }
}