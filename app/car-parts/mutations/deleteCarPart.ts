import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const DeleteCarPart = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteCarPart), resolver.authorize(), async ({ id }) => {
  const carPart = await db.carPart.deleteMany({ where: { id } })

  return carPart
})
