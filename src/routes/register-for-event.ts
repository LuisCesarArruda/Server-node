import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {promise, z} from "zod";
import { prisma } from "../lib/prisma";
import { error } from "console";
import { BadRequest } from "./_Errors/bad-request";

export async function registerForEvent(app:FastifyInstance){

    app
        .withTypeProvider<ZodTypeProvider>()
        .post("/events/:eventsId/attendees",{
            schema:{
                summary:"register an attendee",
                tags: ["attendees"],
                body: z.object({
                    name: z.string().min(4),
                    email: z.string().email(),
                }),
                params: z.object({
                    eventsId: z.string().uuid()
                }),
                response:{
                    201: z.object({
                        attendeeId: z.number(),
                    })
                }
            }
        }, async (req, res)=>{
            const {eventsId} = req.params
            const {name, email} = req.body

            

            const attendeeFromEmail = await prisma.attendees.findUnique({
                where:{
                    eventsId_email: {
                        email,
                        eventsId,
                    }
                }
            })
            if(attendeeFromEmail != null){
                throw new BadRequest("Email ja registrado nesse evento")
            }



            const[event, amountOfAttendeesForEvent] = await Promise.all([
                prisma.events.findUnique({
                    where:{
                        id: eventsId,
                    }
                }),

                prisma.attendees.count({
                    where:{
                        eventsId,
                    }
                })

            ])

            if(event?.maximumAttendees && amountOfAttendeesForEvent >= event?.maximumAttendees){
                throw new BadRequest("o evento esta lotado não há mais espaço")
            }

            const attendee = await prisma.attendees.create({
                data:{
                    name,
                    email,
                    eventsId,
                }
            })
            return res.status(201).send({attendeeId:attendee.id})
        })
        
}
