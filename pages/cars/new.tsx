import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "app/core/layouts/Layout"
import createCar from "app/cars/mutations/createCar"
import { CarForm, FORM_ERROR } from "app/cars/components/CarForm"
import { supabase } from "lib/supabase"
import { Button, Text, Flex, Box, Stack } from "@chakra-ui/react"
const NewCarPage = () => {
  const router = useRouter()
  const [createCarMutation] = useMutation(createCar)

  return (
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
          // submitText="Dodaj ogłoszenie"
          onSubmit={async (values) => {
            try {
              const car = await createCarMutation(values)
              await router.push(Routes.ShowCarPage({ carId: car.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
        {/* <Stack spacing={10} p="3rem" boxShadow="md">
          <Button bg="teal.500">Dodaj ogłoszenie</Button>
        </Stack> */}
      </Box>
    </Flex>
  )
}

NewCarPage.authenticate = true

export default NewCarPage
