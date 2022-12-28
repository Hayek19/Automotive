import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import Layout from "app/core/layouts/Layout"
import getCar from "app/cars/queries/getCar"
import deleteCar from "app/cars/mutations/deleteCar"

export const Car = () => {
  const router = useRouter()
  const carId = useParam("carId", "number")
  const [deleteCarMutation] = useMutation(deleteCar)
  const [car] = useQuery(getCar, { id: carId })

  return (
    <>
      <Head>
        <title>Car {car.id}</title>
      </Head>

      <div>
        <h1>{car.name + " " + car.model}</h1>
        <pre>{JSON.stringify(car, null, 2)}</pre>
        <div>
          <Link href={Routes.EditCarPage({ carId: car.id })}>
            <a>Edytuj ogłoszenie </a>
          </Link>
          <EditIcon w={26} h={26} />
        </div>
        <button
          type="button"
          onClick={async () => {
            if (window.confirm("Ogłoszenie zostanie usunięte")) {
              await deleteCarMutation({ id: car.id })
              await router.push(Routes.CarsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Usuń ogłoszenie
        </button>
        <DeleteIcon w={26} h={26} />
      </div>
    </>
  )
}

const ShowCarPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.CarsPage()}>
          <a>Wszystkie ogłoszenia</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Car />
      </Suspense>
    </div>
  )
}

ShowCarPage.authenticate = true
ShowCarPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowCarPage
