import {
  registerForEvent
} from "./chunk-YNENQV72.mjs";
import {
  errorHandler
} from "./chunk-NIPE6D2B.mjs";
import {
  checkIn
} from "./chunk-RRNLH2W3.mjs";
import {
  createEvent
} from "./chunk-CBI6ELTR.mjs";
import "./chunk-KDMJHR3Z.mjs";
import {
  getAttendeeBadge
} from "./chunk-N6TQMAJM.mjs";
import {
  getEventAttendees
} from "./chunk-BM6BW4RJ.mjs";
import {
  getEvent
} from "./chunk-4ZRP527X.mjs";
import "./chunk-OZJVZKS7.mjs";
import "./chunk-JV6GRE7Y.mjs";

// src/server.ts
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
var app = fastify();
app.register(fastifyCors, {
  origin: "*"
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["aplication/json"],
    produces: ["aplication/json"],
    info: {
      title: "pass.in",
      description: "API feita no NLW Unite",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("server funcionando");
});
export {
  app
};
