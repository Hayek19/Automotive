import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const UpdateCarPart = z.object({
  id: z.number(),
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(UpdateCarPart),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const carPart = await db.carPart.update({ where: { id }, data });

    return carPart;
  }
);
