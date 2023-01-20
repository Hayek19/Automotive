import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const DeleteCarPart = z.object({
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(DeleteCarPart),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const carPart = await db.carPart.deleteMany({ where: { id } });

    return carPart;
  }
);
