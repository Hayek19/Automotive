import { paginate } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db, { Prisma } from "db";

interface GetCarsInput
  extends Pick<Prisma.CarFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetCarsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: cars,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.car.count({ where }),
      query: (paginateArgs) =>
        db.car.findMany({ ...paginateArgs, where, orderBy }),
    });

    return {
      cars,
      nextPage,
      hasMore,
      count,
    };
  }
);
