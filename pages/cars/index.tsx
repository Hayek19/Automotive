import { Suspense, useState } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import getCars from "app/cars/queries/getCars"
import { useQuery } from "@blitzjs/rpc"
import { e } from "@blitzjs/auth/dist/index-834e37b5"
import { Car } from "./[carId]"

const ITEMS_PER_PAGE = 100
const optionsDamage = [
  {
    label: "Nie",
    value: "Nie",
  },
  {
    label: "Tak",
    value: "Tak",
  },
]
const optionsOwner = [
  {
    label: "Nie",
    value: "Nie",
  },
  {
    label: "Tak",
    value: "Tak",
  },
]
const optionsCity = [
  {
    label: "Łódź",
    value: "Łódź",
  },
  {
    label: "Tuszyn",
    value: "Tuszyn",
  },
  {
    label: "Zgierz",
    value: "Zgierz",
  },
  {
    label: "Rzgów",
    value: "Rzgów",
  },
]
const options = [
  {
    label: "Wszystkie",
    value: "",
  },
  {
    label: "Benzyna",
    value: "Benzyna",
  },
  {
    label: "Diesel",
    value: "Diesel",
  },
  {
    label: "LPG",
    value: "LPG",
  },
  {
    label: "Elektryczny",
    value: "Elektryczny",
  },
]
export const CarsList = () => {
  const router = useRouter()
  const [filterValueName, setFilterValue] = useState("")
  const [filterValueModel, setFilterValue2] = useState("")
  const [filterValueFuel, setFilterValue3] = useState("")
  const [filterValueGtePrice, setFilterValue4] = useState<number>()
  const [ffilterValueLtePrice, setFilterValue5] = useState<number>()
  const [filterValueGteYear, setFilterValue6] = useState<number>()
  const [filterValueLteYear, setFilterValue7] = useState<number>()
  const [filterValueGteHp, setFilterValue8] = useState<number>()
  const [filterValueLteHp, setFilterValue9] = useState<number>()
  const [filterValueDamage, setFilterValue10] = useState("")
  const [filterValueFirstOwner, setFilterValue11] = useState("")
  const [filterValueCity, setFilterValue12] = useState("")

  const page = Number(router.query.page) || 0
  const [{ cars, hasMore }] = usePaginatedQuery(getCars, {
    orderBy: { id: "asc" },
    where: {
      name: { contains: filterValueName },
      model: { contains: filterValueModel },
      fuel: { contains: filterValueFuel },
      price: {
        gte: filterValueGtePrice
          ? isNaN(filterValueGtePrice)
            ? 0
            : filterValueGtePrice
          : undefined,
        lte: ffilterValueLtePrice
          ? isNaN(ffilterValueLtePrice)
            ? 0
            : ffilterValueLtePrice
          : undefined,
      },
      year: {
        gte: filterValueGteYear ? (isNaN(filterValueGteYear) ? 0 : filterValueGteYear) : undefined,
        lte: filterValueLteYear ? (isNaN(filterValueLteYear) ? 0 : filterValueLteYear) : undefined,
      },
      hp: {
        gte: filterValueGteHp ? (isNaN(filterValueGteHp) ? 0 : filterValueGteHp) : undefined,
        lte: filterValueLteHp ? (isNaN(filterValueLteHp) ? 0 : filterValueLteHp) : undefined,
      },
      city: { contains: filterValueCity },
    },

    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })
  return (
    <div>
      <div>
        Marka Samochodu:
        <input
          value={filterValueName}
          onChange={(e) => {
            setFilterValue(e.currentTarget.value)
          }}
        />
      </div>
      <div>
        Model samochodu:
        <input
          value={filterValueModel}
          onChange={(e) => {
            setFilterValue2(e.currentTarget.value)
          }}
        />
      </div>
      <div>
        Rodzaj Paliwa:
        <select
          value={filterValueFuel}
          onChange={(e) => {
            setFilterValue3(e.currentTarget.value)
          }}
        >
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <div>
        Cena:
        <div>
          Min:
          <input
            type="number"
            value={filterValueGtePrice}
            onChange={(e) => {
              setFilterValue4(e.currentTarget.valueAsNumber)
            }}
          />
        </div>
        <div>
          Max:
          <input
            type="number"
            value={ffilterValueLtePrice}
            onChange={(e) => {
              setFilterValue5(e.currentTarget.valueAsNumber)
            }}
          />
        </div>
      </div>
      {/* <input type="number" value={filterValue4} onChange={(e) => {setFilterValue4(e.currentTarget.valueAsNumber)}} /> */}

      <div>
        Rok produkcji:
        <div>
          Od:
          <input
            type="number"
            value={filterValueGteYear}
            onChange={(e) => {
              setFilterValue6(e.currentTarget.valueAsNumber)
            }}
          />
        </div>
        <div>
          Do:
          <input
            type="number"
            value={filterValueLteYear}
            onChange={(e) => {
              setFilterValue7(e.currentTarget.valueAsNumber)
            }}
          />
        </div>
      </div>
      <div>
        Moc Silnika:
        <div>
          Min:
          <input
            type="number"
            value={filterValueGteHp}
            onChange={(e) => {
              setFilterValue8(e.currentTarget.valueAsNumber)
            }}
          />
        </div>
        <div>
          Max:
          <input
            type="number"
            value={filterValueLteHp}
            onChange={(e) => {
              setFilterValue7(e.currentTarget.valueAsNumber)
            }}
          />
        </div>
      </div>
      <div>
        Uszkodzony:
        <select
          value={filterValueDamage}
          onChange={(e) => {
            setFilterValue10(e.currentTarget.value)
          }}
        >
          {optionsDamage.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <div>
        Pierwszy właściciel:
        <select
          value={filterValueFirstOwner}
          onChange={(e) => {
            setFilterValue11(e.currentTarget.value)
          }}
        >
          {optionsOwner.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
        <div>
          Miasto:
          <select
            value={filterValueCity}
            onChange={(e) => {
              setFilterValue12(e.currentTarget.value)
            }}
          >
            {optionsCity.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <p>Znalezione samochody:</p>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            <Link href={Routes.ShowCarPage({ carId: car.id })}>
              <a>
                {car.name +
                  " " +
                  car.model +
                  " (cena: " +
                  car.price +
                  "zł" +
                  ", przebieg: " +
                  car.mileage +
                  "km " +
                  "rocznik: " +
                  car.year +
                  "rok)"}
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <button disabled={page === 0} onClick={goToPreviousPage}>
        Poprzednia
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Następna
      </button>
      <p>
        <Link href={Routes.Home()}>
          <a>Strona główna</a>
        </Link>
      </p>
    </div>
  )
}

const CarsPage = () => {
  return (
    <Layout>
      <Head>
        <title>Ogłoszenia</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewCarPage()}>
            <a>Dodaj ogłoszenie</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <CarsList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default CarsPage
