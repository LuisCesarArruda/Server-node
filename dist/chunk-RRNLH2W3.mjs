import {
  BadRequest
} from "./chunk-OZJVZKS7.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/check-in.ts
import z from "zod";
async function checkIn(app) {
  app.withTypeProvider().get("/attendees/:attendeesId/check-in", {
    schema: {
      summary: " check in an attendee",
      tags: ["check-ins"],
      params: z.object({
        attendeesId: z.coerce.number().int()
      }),
      response: {
        201: z.null()
      }
    }
  }, async (req, res) => {
    const { attendeesId } = req.params;
    const attendeCheckIn = await prisma.checkIn.findUnique({
      where: {
        attendeesId
      }
    });
    if (attendeCheckIn != null) {
      throw new BadRequest("Participante ja fez o check-in");
    }
    await prisma.checkIn.create({
      data: {
        attendeesId
      }
    });
    return res.status(201).send();
  });
}

export {
  checkIn
};
