import neo4j, { Driver } from 'neo4j-driver';

class Neo4jConfig {
  private static instance: Neo4jConfig;
  private driver: Driver;

  constructor() {
    this.driver = neo4j.driver(
      'bolt://localhost:7687',
      neo4j.auth.basic('neo4j', 'teste1234'),
    );
  }

  public getDriver(): Driver {
    return this.driver;
  }

  public close(): void {
    this.driver.close();
  }
}

export default Neo4jConfig;