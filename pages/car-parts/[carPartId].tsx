import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";
import getCarPart from "app/car-parts/queries/getCarPart";
import deleteCarPart from "app/car-parts/mutations/deleteCarPart";

export const CarPart = () => {
  const router = useRouter();
  const carPartId = useParam("carPartId", "number");
  const [deleteCarPartMutation] = useMutation(deleteCarPart);
  const [carPart] = useQuery(getCarPart, { id: carPartId });

  return (
    <>
      <Head>
        <title>CarPart {carPart.id}</title>
      </Head>

      <div>
        <h1>CarPart {carPart.id}</h1>
        <pre>{JSON.stringify(carPart, null, 2)}</pre>

        <Link href={Routes.EditCarPartPage({ carPartId: carPart.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteCarPartMutation({ id: carPart.id });
              await router.push(Routes.CarPartsPage());
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  );
};

const ShowCarPartPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.CarPartsPage()}>
          <a>CarParts</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <CarPart />
      </Suspense>
    </div>
  );
};

ShowCarPartPage.authenticate = true;
ShowCarPartPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowCarPartPage;
