import { Request, Response } from 'express';
import Data from '../services/data/knex';
import CustomError from '../utils/CustomError';
import * as category from '../configs/json/errors/knex/category.json';

interface IWhere {
  column: string;
  operator: string;
  value: any;
}

/**
 * Custom message errors from table
 * @param table
 * @returns object
 */
const customTableErrors = (table: string) => {
  const tables = {
    category,
  };
  return tables[`${table}` as keyof typeof tables] || -1;
};

/**
 * Custom error
 * @param table
 * @param error
 * @param res
 */
const processError = (table: string, error: any, res: Response) => {
  const mapErrors = customTableErrors(table);
  const customError = new CustomError(error);
  const { message, statusCode } = mapErrors[error.code as keyof typeof mapErrors] ?? customError;
  res.status(statusCode).json({ error: message });
};

/**
 * Process the statement on the database
 * @param data
 * @param statusCode
 * @param req
 * @param res
 */
const request = async (data: any, statusCode: number, req: Request, res: Response) => {
  try {
    const promise = new Promise((resolve) => {
      resolve(data);
    });
    await promise.then((result) => {
      res.status(statusCode).json(result);
    });
  } catch (error) {
    processError(req.params.table, error, res);
  }
};

/**
 * Process select statement on database
 * @param req
 * @param res
 */
const select = async (req: Request, res: Response) => {
  const where: IWhere = { column: 'id', operator: '=', value: req.params.id };
  const data = new Data(req.params.table, { where });

  await request(data.select(), 200, req, res);
};

/**
 * Process insert statement on database
 * @param req
 * @param res
 */
const insert = async (req: Request, res: Response) => {
  const data = new Data(req.params.table, { insert: req.body });

  await request(data.insert(), 201, req, res);
};

/**
 * Process update statement on database
 * @param req
 * @param res
 */
const update = async (req: Request, res: Response) => {
  const where: IWhere = { column: 'id', operator: '=', value: req.body.id };
  const data = new Data(req.params.table, { update: req.body, where });

  await request(data.update(), 200, req, res);
};

/**
 * Process delete statement on database
 * @param req
 * @param res
 */
const remove = async (req: Request, res: Response) => {
  const where: IWhere = { column: 'id', operator: '=', value: req.params.id };
  const data = new Data(req.params.table, { where });

  await request(data.delete(), 200, req, res);
};

export { select, insert, update, remove };
