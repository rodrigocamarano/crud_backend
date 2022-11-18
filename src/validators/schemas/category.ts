import { required, type, empty, maxLength } from '../../configs/json/errors/ajv/category.json';

const id = {
  type: 'integer',
  errorMessage: type.id,
};

const description = {
  type: 'string',
  errorMessage: type.description,
  allOf: [
    { not: { maxLength: 0 }, errorMessage: empty.description },
    { maxLength: 45, errorMessage: maxLength.description },
  ],
};

const select = {
  type: 'object',
  properties: {
    id,
  },
  required: ['id'],
  errorMessage: {
    required: {
      id: required.id,
    },
  },
};

const insert = {
  type: 'object',
  properties: {
    description,
  },
  required: ['description'],
  errorMessage: {
    required: {
      description: required.description,
    },
  },
};

const update = {
  type: 'object',
  properties: {
    id,
    description,
  },
  required: ['id', 'description'],
  errorMessage: {
    required: {
      id: required.id,
      description: required.description,
    },
  },
};

const remove = {
  type: 'object',
  properties: {
    id,
  },
  required: ['id'],
  errorMessage: {
    required: {
      id: required.id,
    },
  },
};

export { select, insert, update, remove };
