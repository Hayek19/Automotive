import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const CreateCar = z.object({
  name: z.string(),
  model: z.string(),
  fuel: z.string(),
  mileage: z.number(),
  year: z.number(),
  price: z.number(),
  description: z.string(),
  hp: z.number(),
  engine: z.number(),
  city: z.string(),
  phone: z.string(),
  doors: z.number(),
  damage: z.string(),
  firstOwner: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateCar),
  resolver.authorize(),
  async (input, context) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const userID = context.session.userId
    const car = await db.car.create({ data: { ...input, userID } })

    return car
  }
)
