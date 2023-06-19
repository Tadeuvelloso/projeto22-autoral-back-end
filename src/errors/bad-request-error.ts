import { ApplicationError } from '../protocols/index.js';

export function badRequestError(): ApplicationError {
  return {
    name: 'BadRequestError',
    message: 'Bad Request Error!',
  };
}