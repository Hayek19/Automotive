import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "app/core/layouts/Layout"
import createCar from "app/cars/mutations/createCar"
import { CarForm, FORM_ERROR } from "app/cars/components/CarForm"
import { supabase } from "lib/supabase"

const NewCarPage = () => {
  const router = useRouter()
  const [createCarMutation] = useMutation(createCar)

  return (
    <Layout title={"Create New Car"}>
      <h1>Create New Car</h1>

      <CarForm
        submitText="Dodaj ogłoszenie"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateCar}
        // initialValues={{}}
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
        <Link href={Routes.CarsPage()}>
          <a>Cars</a>
        </Link>
      </p>
    </Layout>
  )
}

NewCarPage.authenticate = true

export default NewCarPage
