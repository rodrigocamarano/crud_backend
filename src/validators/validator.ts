import { Request, Response, NextFunction } from 'express';
import Ajv from '../utils/Ajv';
import * as category from './schemas/category';
import CustomError from '../utils/CustomError';

/**
 * Get schemas to validate
 * @param schema
 * @returns object
 */
const getSchema = (schema: string) => {
  const result = {
    category,
  };
  return result[`${schema}` as keyof typeof result];
};

/**
 * Set statement from database
 * @param table
 * @param schema
 * @returns object
 */
const setStatement = (table: string, schema: string) => {
  const schemas = getSchema(table) ?? false;
  return schemas[`${schema}` as keyof typeof schemas];
};

/**
 * Process request
 * @param table
 * @param schema
 * @param req
 * @param res
 * @param next
 * @returns object
 */
const request = (table: string, schema: string, req: Request, res: Response, next: NextFunction) => {
  const scm = setStatement(table, schema);
  if (!scm) {
    return res.status(404).json({ error: { message: `Table '${table}' not found.` } });
  }
  if (Object.keys(scm.properties).sort().join() !== Object.keys(req.body).sort().join()) {
    return res.status(400).json({ error: { message: `'${req.params.table}' table only allow '${Object.keys(scm.properties).join(', ')}' in body.` } });
  }
  const methodToValidete = () => {
    if (req.method === 'GET' || req.method === 'DELETE') {
      return { id: Number(req.params.id) };
    }
    return req.body;
  };
  if (req.params.id || req.method !== 'GET') {
    const error = Ajv.validate(scm, methodToValidete());
    if (error instanceof CustomError) {
      const { statusCode, message } = error;
      return res.status(statusCode).json({ error: { validate: JSON.parse(message) } });
    }
  }
  return next();
};

const select = (req: Request, res: Response, next: NextFunction) => request(req.params.table, 'select', req, res, next);

const insert = (req: Request, res: Response, next: NextFunction) => request(req.params.table, 'insert', req, res, next);

const update = (req: Request, res: Response, next: NextFunction) => request(req.params.table, 'update', req, res, next);

const remove = (req: Request, res: Response, next: NextFunction) => request(req.params.table, 'remove', req, res, next);

export { select, insert, update, remove };
