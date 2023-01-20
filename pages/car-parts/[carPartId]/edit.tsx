import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";
import getCarPart from "app/car-parts/queries/getCarPart";
import updateCarPart from "app/car-parts/mutations/updateCarPart";
import { CarPartForm, FORM_ERROR } from "app/car-parts/components/CarPartForm";

export const EditCarPart = () => {
  const router = useRouter();
  const carPartId = useParam("carPartId", "number");
  const [carPart, { setQueryData }] = useQuery(
    getCarPart,
    { id: carPartId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateCarPartMutation] = useMutation(updateCarPart);

  return (
    <>
      <Head>
        <title>Edit CarPart {carPart.id}</title>
      </Head>

      <div>
        <h1>Edit CarPart {carPart.id}</h1>
        <pre>{JSON.stringify(carPart, null, 2)}</pre>

        <CarPartForm
          submitText="Update CarPart"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateCarPart}
          initialValues={carPart}
          onSubmit={async (values) => {
            try {
              const updated = await updateCarPartMutation({
                id: carPart.id,
                ...values,
              });
              await setQueryData(updated);
              await router.push(
                Routes.ShowCarPartPage({ carPartId: updated.id })
              );
            } catch (error: any) {
              console.error(error);
              return {
                [FORM_ERROR]: error.toString(),
              };
            }
          }}
        />
      </div>
    </>
  );
};

const EditCarPartPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCarPart />
      </Suspense>

      <p>
        <Link href={Routes.CarPartsPage()}>
          <a>CarParts</a>
        </Link>
      </p>
    </div>
  );
};

EditCarPartPage.authenticate = true;
EditCarPartPage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditCarPartPage;
