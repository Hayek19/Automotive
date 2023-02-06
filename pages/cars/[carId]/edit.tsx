import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "app/core/layouts/Layout"
import getCar from "app/cars/queries/getCar"
import updateCar from "app/cars/mutations/updateCar"
import { CarForm, FORM_ERROR } from "app/cars/components/CarForm"
import { Flex, Box } from "@chakra-ui/react"
export const EditCar = () => {
  const router = useRouter()
  const carId = useParam("carId", "number")
  const [car, { setQueryData }] = useQuery(
    getCar,
    { id: carId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateCarMutation] = useMutation(updateCar)

  return (
    <>
      <Head>
        <title>Edit Car {car.id}</title>
      </Head>

      <div>
        <Flex bgGradient="linear(gray.600, gray.700, gray.600)">
          <Box
            bgGradient="linear(gray.600, gray.700, gray.600)"
            color="white"
            borderRadius="lg"
            m={{ sm: 4, md: 16, lg: 10 }}
            p={{ sm: 5, md: 5, lg: 16 }}
            w="100%"
            h="100%"
          >
            <CarForm
              submitText="Update Car"
              // TODO use a zod schema for form validation
              //  - Tip: extract mutation's schema into a shared `validations.ts` file and
              //         then import and use it here
              // schema={UpdateCar}
              initialValues={car}
              onSubmit={async (values) => {
                try {
                  const updated = await updateCarMutation({
                    id: car.id,
                    ...values,
                  })
                  await setQueryData(updated)
                  await router.push(Routes.ShowCarPage({ carId: updated.id }))
                } catch (error: any) {
                  console.error(error)
                  return {
                    [FORM_ERROR]: error.toString(),
                  }
                }
              }}
            />
          </Box>
        </Flex>
      </div>
    </>
  )
}

const EditCarPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCar />
      </Suspense>

      <p>
        <Link href={Routes.CarsPage()}>
          <a>Cars</a>
        </Link>
      </p>
    </div>
  )
}

EditCarPage.authenticate = true
EditCarPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditCarPage
