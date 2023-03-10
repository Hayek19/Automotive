import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const UpdateCar = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateCar),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const car = await db.car.update({ where: { id }, data })

    return car
  }
)
