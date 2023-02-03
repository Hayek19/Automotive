import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "app/core/layouts/Layout"
import createCar from "app/cars/mutations/createCar"
import { CarForm, FORM_ERROR } from "app/cars/components/CarForm"
import { supabase } from "lib/supabase"
import { Button } from "@chakra-ui/react"
const NewCarPage = () => {
  const router = useRouter()
  const [createCarMutation] = useMutation(createCar)

  return (
    <Layout title={"Create New Car"}>
      <h1>Stwórz nowe ogłoszenie</h1>

      <CarForm
        submitText="Dodaj ogłoszenie"
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

      <p>
        <Button bg="teal.400">
          <Link href={Routes.CarsPage()}>
            <a>Powrót do ogłoszeń</a>
          </Link>
        </Button>
      </p>
    </Layout>
  )
}

NewCarPage.authenticate = true

export default NewCarPage
