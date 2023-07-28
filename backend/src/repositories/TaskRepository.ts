import Neo4jConfig from "../database/Neo4jConfig";
import { ITask } from "../interface/TaskInterface";

export class TasksRepository {
  private neo4jConfig: Neo4jConfig;

  constructor() {
    this.neo4jConfig = new Neo4jConfig();
  }

  async createTask(idUser: number,task: ITask) {
    try {
      const session = this.neo4jConfig.getDriver().session();
      const result = await session.run(
        `
            CREATE (task: Task {
              id: $id,
              title: $title,
              description: $description,
              createdAt: $createdAt,
              status: $status
            })
            `,
        task
      );

      const idTask = result.summary.query.parameters.id;
      await session.run(`
      MATCH (u:User { id: $idUser }),
            (t:Task {id: $idTask})
      CREATE (u)-[:HAVE]->(t)`, {
        idUser,
        idTask
      });
      session.close();
      return result.summary.query.parameters;
    } catch (error) {
      throw error;
    }
  }

  async listAllTasks(idUser: string) {
    try {
      const session = this.neo4jConfig.getDriver().session();
      const result = await session.run(`
        MATCH (u:User {id: $idUser})-[:HAVE]->(t:Task) RETURN t`,
        {idUser}
      );

      session.close();
      return result.records.map((record) => {
        const taskProperties = record.get("t").properties;
        return { ...taskProperties };
      });
    } catch (error) {
      throw error;
    }
  }

  async listTasksByStatus(idUser: string, status: boolean, ) {
    try {
      const session = this.neo4jConfig.getDriver().session();
      const result = await session.run(
        `MATCH (u:User {id: $idUser})-[:HAVE]->(t:Task {status: $status}) RETURN t`,
        { idUser, status }
      );
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

  async deleteTaskById(idUser:string, idTask: number) {
    try {
      const session = this.neo4jConfig.getDriver().session();
      const result = await session.run(
        `MATCH (u:User {id: $idUser})-[:HAVE]->(t:Task {id: $idTask}) DETACH DELETE t`,
        { idUser, idTask }
      );
      session.close();
      return result.summary.query;
    } catch (error) {
      throw error;
    }
  }

  async updateTaskById(idUser: string, task: { id: number; status: boolean }) {
 
    try {
      const session = this.neo4jConfig.getDriver().session();
      const result = await session.run(
        `MATCH (u:User {id: $idUser})-[:HAVE]->(t:Task {id: $id})
         SET t.status = $status
         RETURN t`,
        { 
          idUser,
          id: task.id,
          status: task.status
        }
      );
      session.close();
      return result.summary.query.parameters;
    } catch (error) {
      throw error;
    }
  }
}
