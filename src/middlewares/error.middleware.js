import createError from "http-errors";
import { ValidationError } from "express-validation";

function getResponseMessage(err) {
  let message;
  if (err.details?.body) return (message = err.details?.body[0].message);
  if (err.details?.params) return (message = err.details?.params[0].message);
  if (err.details?.query) return (message = err.details?.query[0].message);
}

export const notFoundHandler = (req, res, next) => {
  return next(createError.NotFound("Resource not found"));
};

export const mainErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(err.statusCode).send(`MESSAGE: ${getResponseMessage(err)}`);
  } else {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    res.status(status).send(`MESSAGE: ${message}`);
  }
};