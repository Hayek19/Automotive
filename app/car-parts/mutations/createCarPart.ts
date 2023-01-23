import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const CreateCarPart = z.object({
  name: z.string(),
  type: z.string(),
  brand: z.string(),
  model: z.string(),
  fuel: z.string(),
  description: z.string(),
  hp: z.number(),
  engine: z.number(),
  city: z.string(),
  // image: z.
})

export default resolver.pipe(resolver.zod(CreateCarPart), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const carPart = await db.carPart.create({ data: input })

  return carPart
})
