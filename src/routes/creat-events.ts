import { error } from "console"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import {z} from "zod"
import { generateSlug } from "../utils/generate-slug"
import { prisma } from "../lib/prisma"
import { FastifyInstance } from "fastify"
import { BadRequest } from "./_Errors/bad-request"

export async function createEvent(app: FastifyInstance){
    app
        .withTypeProvider<ZodTypeProvider>()
        .post("/events", {
            schema:{
                summary:"create an event",
                tags: ["events"],
                body: z.object({
                    title: z.string().min(4),
                    details: z.string().nullable(),
                    maximumAttendees: z.number().int().positive().nullable()
                }),
                response:{
                    201: z.object({
                        eventId: z.string().uuid()
                    })
                }
            }
        }, async (req,res)=>{


            const {
                title,
                details,
                maximumAttendees
            } = req.body

            const slug = generateSlug(title)

            const eventWithSameSlug = await prisma.events.findUnique({
                where:{
                    slug,
                }
            })

            if(eventWithSameSlug != null){
                throw new BadRequest("Já existe  um evento com esse titulo")
            }


            const event = await prisma.events.create({
                data: {
                    title,
                    details,
                    maximumAttendees,
                    slug,
                },
            })

            return res.status(201).send({eventId: event.id})
        })
}

