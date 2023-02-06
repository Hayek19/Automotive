import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetCarPartsInput
  extends Pick<Prisma.CarPartFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetCarPartsInput) => {
    const {
      items: carParts,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.carPart.count({ where }),
      query: (paginateArgs) => db.carPart.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      carParts,
      nextPage,
      hasMore,
      count,
    }
  }
)
