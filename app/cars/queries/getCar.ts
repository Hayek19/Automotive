import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetCar = z.object({
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetCar), resolver.authorize(), async ({ id }) => {
  const car = await db.car.findFirst({ where: { id } })
  if (!car) throw new NotFoundError()

  return car
})
