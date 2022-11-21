import * as dotenv from 'dotenv';
import { Knex, knex } from 'knex';

dotenv.config();

/**
 * Knex config to MySQL
 */
const config: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
};

const knexInstance = knex(config);

/**
 * Get current datetime to MySQL
 * @returns string
 */
const currentDate = () => new Date().toISOString().slice(0, 19).replace('T', ' ');

/**
 * Class used to Database
 */
class Data {
  table: string;
  params: any;
  constructor(table: string, params: any) {
    this.table = table;
    this.params = params;
  }

  /**
   * Select statement
   * @returns object
   */
  async select() {
    const { column, operator, value } = this.params.where;
    const result = value
      ? await knexInstance
          .from(this.table)
          .select(this.params?.select?.columns)
          .where(column, operator, value)
          .then((rows) => rows)
      : await knexInstance
          .from(this.table)
          .select(this.params?.select?.columns)
          .then((rows) => rows);
    return result;
  }

  /**
   * Insert statement
   * @returns object
   */
  async insert() {
    this.params.insert.created_at = currentDate();
    this.params.insert.updated_at = currentDate();
    const result = await knexInstance
      .from(this.table)
      .insert(this.params.insert)
      .then((rows) => rows);
    return result;
  }

  /**
   * Update statement
   * @returns object
   */
  async update() {
    this.params.update.updated_at = currentDate();
    const { column, operator, value } = this.params.where;
    const result = await knexInstance
      .from(this.table)
      .update(this.params.update)
      .where(column, operator, value)
      .then((rows) => rows);
    return result;
  }

  /**
   * Delete statement
   * @returns object
   */
  async delete() {
    const { column, operator, value } = this.params.where;
    const result = await knexInstance
      .from(this.table)
      .delete()
      .where(column, operator, value)
      .then((rows) => rows);
    return result;
  }

  static async truncate(table: string) {
    await knexInstance.from(table).truncate();
  }

  static async raw(raw: string) {
    await knexInstance.schema.raw(raw);
  }
}

export default Data;
