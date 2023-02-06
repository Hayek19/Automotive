import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "app/core/layouts/Layout"
import createCarPart from "app/car-parts/mutations/createCarPart"
import { CarPartForm, FORM_ERROR } from "app/car-parts/components/CarPartForm"
import { Flex, Box, Center } from "@chakra-ui/react"
const NewCarPartPage = () => {
  const router = useRouter()
  const [createCarPartMutation] = useMutation(createCarPart)

  return (
    <Layout title={"Create New CarPart"}>
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
          <CarPartForm
            submitText="Create CarPart"
            // TODO use a zod schema for form validation
            //  - Tip: extract mutation's schema into a shared `validations.ts` file and
            //         then import and use it here
            // schema={CreateCarPart}
            // initialValues={{}}
            onSubmit={async (values) => {
              try {
                const carPart = await createCarPartMutation(values)
                await router.push(Routes.ShowCarPartPage({ carPartId: carPart.id }))
              } catch (error: any) {
                console.error(error)
                return {
                  [FORM_ERROR]: error.toString(),
                }
              }
            }}
          />

          <p>
            <Link href={Routes.CarPartsPage()}>
              <a>CarParts</a>
            </Link>
          </p>
        </Box>
      </Flex>
    </Layout>
  )
}

NewCarPartPage.authenticate = true

export default NewCarPartPage
