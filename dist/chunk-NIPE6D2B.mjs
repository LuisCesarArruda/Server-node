import {
  BadRequest
} from "./chunk-OZJVZKS7.mjs";

// src/error-handler.ts
import { ZodError } from "zod";
var errorHandler = (error, res, rep) => {
  if (error instanceof ZodError) {
    return rep.status(400).send({
      message: "error durante a valida\xE7\xE3o",
      erros: error.flatten().fieldErrors
    });
  }
  if (error instanceof BadRequest) {
    return rep.status(400).send({ mensage: error.message });
  }
  return rep.status(500).send({ message: "Iternal server error" });
};

export {
  errorHandler
};
