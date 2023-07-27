import Neo4jConfig from "../database/neo4j";
import { ICreateTask } from "../interface/TasksInterface";

export class TasksRepository {
  private neo4Config: Neo4jConfig;

  constructor() {
    this.neo4Config = new Neo4jConfig();
  }

  async createTask(task: ICreateTask) {
    try {
      const session = this.neo4Config.getDriver().session();
      const result = await session.run(
        `
            CREATE (task: Task {
              title: $title,
              description: $description,
              createdAt: $createdAt,
              status: $status
            })
            `,
        task
      );
      session.close();
      return result.summary.query.parameters;
    } catch (error) {
      throw error;
    }
  }

  async listAllTasks() {
    try {
      const session = this.neo4Config.getDriver().session();
      const result = await session.run("MATCH (t:Task) RETURN t");

      session.close();
      return result.records.map((record) => {
        const taskProperties = record.get("t").properties;
        const taskId = record.get("t").identity.low;
        return { id: taskId, ...taskProperties };
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteTaskById(id: number) {
    try {
      const session = this.neo4Config.getDriver().session();
      const result = await session.run(
        `MATCH (t:Task) WHERE ID(t) = toInteger($id) DELETE t`,
        { id }
      );
      session.close();
      return result.summary.query.parameters;
    } catch (error) {
      throw error;
    }
  }

  async updateTaskById(task: { id: number; status: boolean }) {
    try {
      const session = this.neo4Config.getDriver().session();
      const result = await session.run(
        `
            MATCH (t:Task) 
              WHERE ID(t) = toInteger($id)
              SET t.status = $status
              RETURN t
            `,
        { id: task.id, status: task.status }
      );
      session.close();
      return result.summary.query.parameters;
    } catch (error) {
      throw error;
    }
  }
}
