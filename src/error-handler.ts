import {FastifyInstance} from "fastify"
import { BadRequest } from "./routes/_Errors/bad-request"
import { ZodError } from "zod"

type fastifyErrorHandler = FastifyInstance["errorHandler"]

export const errorHandler: fastifyErrorHandler = (error, res, rep) =>{

    if(error instanceof ZodError){
        return rep.status(400).send({
            message: "error durante a validação",
            erros: error.flatten().fieldErrors,
        })
    }

    if(error instanceof BadRequest){
        return rep.status(400).send({mensage: error.message})
    }

    return rep.status(500).send({message: "Iternal server error"})
}