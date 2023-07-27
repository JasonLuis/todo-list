import restify, { Next, Request, Response } from 'restify';
import { TasksRoutes } from './routes/tasks.routes';

const app = restify.createServer();
app.use(restify.plugins.bodyParser());
app.use(restify.plugins.queryParser());

const tasksRoutes = new TasksRoutes(app);
tasksRoutes.getRoutes();

app.on('restifyError', (req: Request, res: Response, err: Error, next: Next) => {
    if (err instanceof Error) {
        res.send(400, { message: err.message });
        return next();
    }
    res.send(500, { message: 'Internal Server Error' });
    return next();
});

app.listen(3000, () => console.log('Server is running'));