import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { error } from "console";
import { BadRequest } from "./_Errors/bad-request";

export async function getEvent(app:FastifyInstance) {

    app
        .withTypeProvider<ZodTypeProvider>()
        .get("/events/:eventsId",{
            schema:{
                summary:"Get an event",
                tags: ["events"],
                params: z.object({
                    eventsId: z.string().uuid()
                }),
                response:{
                    200: z.object( {
                        event: z.object({
                            id: z.string().uuid(),
                            title: z.string(),
                            slug: z.string(),
                            details: z.string().nullable(),
                            maximumAttendees: z.number().int().nullable(),
                            attendeesAmount: z.number().int(),
                        })
                    })
                }
            }
        },async (req,rep)=>{

            const {eventsId} = req.params

            const event = await prisma.events.findUnique({
                select:{
                    id: true,
                    title: true,
                    slug: true,
                    details: true,
                    maximumAttendees: true,
                    _count:{
                        select:{
                            Attendees: true,
                        }
                    }
                },
                where:{
                    id: eventsId
                }
            })

            if(event == null){
                throw new BadRequest ("evento não encontrando")
            }

            return rep.send({
                event:{
                    id: eventsId,
                    title: event.title,
                    slug: event.slug,
                    details: event.details,
                    maximumAttendees: event.maximumAttendees,
                    attendeesAmount: event._count.Attendees
                }
            })
        })
    
}