import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/get-event-attendees.ts
import z from "zod";
async function getEventAttendees(app) {
  app.withTypeProvider().get("/events/:eventsId/attendees", {
    schema: {
      summary: "Get event attendees",
      tags: ["events"],
      params: z.object({
        eventsId: z.string().uuid()
      }),
      querystring: z.object({
        query: z.string().nullable(),
        pageIndex: z.string().nullable().default("0").transform(Number)
      }),
      response: {
        200: z.object({
          attendee: z.array(
            z.object({
              id: z.number(),
              name: z.string(),
              email: z.string().email(),
              createdAt: z.date(),
              checkedInAt: z.date().nullable()
            })
          )
        })
      }
    }
  }, async (req, rep) => {
    const { eventsId } = req.params;
    const { pageIndex, query } = req.query;
    const attendees = await prisma.attendees.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        checkIn: {
          select: {
            createdAt: true
          }
        }
      },
      where: query ? {
        eventsId,
        name: {
          contains: query
        }
      } : {
        eventsId
      },
      take: 10,
      skip: pageIndex * 10,
      orderBy: {
        createdAt: "desc"
      }
    });
    return rep.send({
      attendee: attendees.map((attendee) => {
        return {
          id: attendee.id,
          name: attendee.name,
          email: attendee.email,
          createdAt: attendee.createdAt,
          checkedInAt: attendee.checkIn?.createdAt ?? null
        };
      })
    });
  });
}

export {
  getEventAttendees
};
