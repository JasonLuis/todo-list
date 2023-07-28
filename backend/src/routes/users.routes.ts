import { Server } from "restify";
import { UserController } from "../controllers/UserController";

export class UsersRoutes {
    private server: Server;
    private userController: UserController;

    constructor(server: Server) {
        this.server = server;
        this.userController = new UserController();
    }

    getRoutes() {
        this.server.post("/users/", this.userController.createUser.bind(this.userController));

        this.server.post("/users/auth/", this.userController.auth.bind(this.userController));
    }
}