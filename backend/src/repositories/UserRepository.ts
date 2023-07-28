import Neo4jConfig from "../database/Neo4jConfig";
import { IUser } from "../interface/UserInterface";

export class UserRepository {
  private neo4jConfig: Neo4jConfig;

  constructor() {
    this.neo4jConfig = new Neo4jConfig();
  }

  async createUser(user: IUser) {
    try {
      const session = this.neo4jConfig.getDriver().session();
      const constraint = await session.run(
        `CREATE CONSTRAINT IF NOT EXISTS FOR (user:User) REQUIRE user.email IS UNIQUE`
      );
      const result = await session.run(
        `
            CREATE (user: User {
                id: $id,
                name: $name,
                email: $email,
                password: $password 
            })
        `,
        user
      );
      session.close();
      return result.summary.query.parameters;
    } catch (error) {
      throw error;
    }
  }

  async findUserByEmail(email: string) {
    try {
      const session = this.neo4jConfig.getDriver().session();
      const result = await session.run(
        `MATCH (u:User {email: $email})
        RETURN u`,
        { email }
      );
      session.close();
      const record = result.records[0]
      const userProperties = record.get("u").properties;
      return { ...userProperties};
    } catch (error) {
      throw error;
    }
  }
}
