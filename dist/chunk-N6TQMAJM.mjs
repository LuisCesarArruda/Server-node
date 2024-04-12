import {
  BadRequest
} from "./chunk-OZJVZKS7.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/get-attendee-badge.ts
import z from "zod";
async function getAttendeeBadge(app) {
  app.withTypeProvider().get("/attendees/:attendeeId/badge", {
    schema: {
      summary: "Get an attendee badge",
      tags: ["attendee"],
      params: z.object({
        attendeeId: z.coerce.number().int()
      }),
      response: {
        200: z.object({
          badge: z.object({
            name: z.string(),
            email: z.string().email(),
            eventTitle: z.string(),
            checkInURL: z.string().url()
          })
        })
      }
    }
  }, async (req, res) => {
    const { attendeeId } = req.params;
    const attendee = await prisma.attendees.findUnique({
      select: {
        name: true,
        email: true,
        event: {
          select: {
            title: true
          }
        }
      },
      where: {
        id: attendeeId
      }
    });
    if (attendee === null) {
      throw new BadRequest("participante n\xE3o encontrado");
    }
    const baseURL = `${req.protocol}://${req.hostname}`;
    const checkInURL = new URL(`/attendees/${attendeeId}/check-in`, baseURL);
    return res.send({
      badge: {
        name: attendee.name,
        email: attendee.email,
        eventTitle: attendee.event.title,
        checkInURL: checkInURL.toString()
      }
    });
  });
}

export {
  getAttendeeBadge
};
