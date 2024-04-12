import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "./_Errors/bad-request";

export async function checkIn(app:FastifyInstance) {
    
    app
        .withTypeProvider<ZodTypeProvider>()
        .get("/attendees/:attendeesId/check-in",{
            schema:{
                summary:" check in an attendee",
                tags: ["check-ins"],
                params: z.object({
                    attendeesId: z.coerce.number().int()
                }),
                response:{
                    201: z.null()
                }
            }
        },async(req,res)=>{
            const {attendeesId}= req.params

            const attendeCheckIn = await prisma.checkIn.findUnique({
                where:{
                    attendeesId,
                }
            })

            if(attendeCheckIn != null){
                throw new BadRequest("Participante ja fez o check-in")
            }

            await prisma.checkIn.create({
                data:{
                    attendeesId,
                }
            })

            return res.status(201).send()
        })
}