import {
  BadRequest
} from "./chunk-OZJVZKS7.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/get-event.ts
import z from "zod";
async function getEvent(app) {
  app.withTypeProvider().get("/events/:eventsId", {
    schema: {
      summary: "Get an event",
      tags: ["events"],
      params: z.object({
        eventsId: z.string().uuid()
      }),
      response: {
        200: z.object({
          event: z.object({
            id: z.string().uuid(),
            title: z.string(),
            slug: z.string(),
            details: z.string().nullable(),
            maximumAttendees: z.number().int().nullable(),
            attendeesAmount: z.number().int()
          })
        })
      }
    }
  }, async (req, rep) => {
    const { eventsId } = req.params;
    const event = await prisma.events.findUnique({
      select: {
        id: true,
        title: true,
        slug: true,
        details: true,
        maximumAttendees: true,
        _count: {
          select: {
            Attendees: true
          }
        }
      },
      where: {
        id: eventsId
      }
    });
    if (event == null) {
      throw new BadRequest("evento n\xE3o encontrando");
    }
    return rep.send({
      event: {
        id: eventsId,
        title: event.title,
        slug: event.slug,
        details: event.details,
        maximumAttendees: event.maximumAttendees,
        attendeesAmount: event._count.Attendees
      }
    });
  });
}

export {
  getEvent
};
