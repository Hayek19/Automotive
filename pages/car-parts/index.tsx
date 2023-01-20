import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import Layout from "app/core/layouts/Layout";
import getCarParts from "app/car-parts/queries/getCarParts";

const ITEMS_PER_PAGE = 100;

export const CarPartsList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ carParts, hasMore }] = usePaginatedQuery(getCarParts, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {carParts.map((carPart) => (
          <li key={carPart.id}>
            <Link href={Routes.ShowCarPartPage({ carPartId: carPart.id })}>
              <a>{carPart.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  );
};

const CarPartsPage = () => {
  return (
    <Layout>
      <Head>
        <title>CarParts</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewCarPartPage()}>
            <a>Create CarPart</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <CarPartsList />
        </Suspense>
      </div>
    </Layout>
  );
};

export default CarPartsPage;
