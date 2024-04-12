import {
  generateSlug
} from "./chunk-KDMJHR3Z.mjs";
import {
  BadRequest
} from "./chunk-OZJVZKS7.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/creat-events.ts
import { z } from "zod";
async function createEvent(app) {
  app.withTypeProvider().post("/events", {
    schema: {
      summary: "create an event",
      tags: ["events"],
      body: z.object({
        title: z.string().min(4),
        details: z.string().nullable(),
        maximumAttendees: z.number().int().positive().nullable()
      }),
      response: {
        201: z.object({
          eventId: z.string().uuid()
        })
      }
    }
  }, async (req, res) => {
    const {
      title,
      details,
      maximumAttendees
    } = req.body;
    const slug = generateSlug(title);
    const eventWithSameSlug = await prisma.events.findUnique({
      where: {
        slug
      }
    });
    if (eventWithSameSlug != null) {
      throw new BadRequest("J\xE1 existe  um evento com esse titulo");
    }
    const event = await prisma.events.create({
      data: {
        title,
        details,
        maximumAttendees,
        slug
      }
    });
    return res.status(201).send({ eventId: event.id });
  });
}

export {
  createEvent
};
