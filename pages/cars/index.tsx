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
import {
  Flex,
  Input,
  Button,
  Stack,
  Box,
  Text,
  Select,
  Center,
  Tfoot,
  TableCaption,
  TableContainer,
  List,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react"

const ITEMS_PER_PAGE = 3
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
    <Flex
      alignItems="center"
      justifyContent="right"
      flexDirection="column"
      // background="linear-gradient(#eeeeee, #757575, #212121)"
      bgGradient="linear(gray.500,gray.400, gray.800)"
      p={3}
      borderRadius={8}
      boxShadow="lg"
      h="120vh"
    >
      <Stack direction={["column", "row"]} spacing="24px">
        <Box w="300px" h="70px">
          <b>Marka Samochodu:</b>
          <Input
            bg="gray.500"
            value={filterValueName}
            onChange={(e) => {
              setFilterValue(e.currentTarget.value)
            }}
          />
        </Box>
        <Box w="300px" h="70px">
          <b>Model samochodu:</b>
          <Input
            bg="gray.500"
            value={filterValueModel}
            onChange={(e) => {
              setFilterValue2(e.currentTarget.value)
            }}
          />
        </Box>
      </Stack>
      <Stack direction={["column", "row"]} spacing="24px">
        <Box w="300px" h="70px">
          {" "}
          <b> Cena minimalna:</b>
          <Input
            bg="gray.500"
            type="number"
            value={filterValueGtePrice}
            onChange={(e) => {
              setFilterValue4(e.currentTarget.valueAsNumber)
            }}
          />
        </Box>
        <Box w="300px" h="70px">
          <b> Cena maksymalna</b>
          <Input
            bg="gray.500"
            type="number"
            value={ffilterValueLtePrice}
            onChange={(e) => {
              setFilterValue5(e.currentTarget.valueAsNumber)
            }}
          />
        </Box>
      </Stack>
      <Stack direction={["column", "row"]} spacing="24px">
        <Box w="300px" h="70px">
          {" "}
          <b> Minimalny rok produkcji</b>
          <Input
            bg="gray.500"
            type="number"
            value={filterValueGteYear}
            onChange={(e) => {
              setFilterValue6(e.currentTarget.valueAsNumber)
            }}
          />
        </Box>
        <Box w="300px" h="70px">
          {" "}
          <b>Maksymalny rok produkcji</b>
          <Input
            bg="gray.500"
            type="number"
            value={filterValueLteYear}
            onChange={(e) => {
              setFilterValue7(e.currentTarget.valueAsNumber)
            }}
          />
        </Box>
      </Stack>
      <Stack direction={["column", "row"]} spacing="24px">
        <Box w="300px" h="70px">
          {" "}
          <b> Minimalna moc silnika:</b>
          <Input
            bg="gray.500"
            type="number"
            value={filterValueGteHp}
            onChange={(e) => {
              setFilterValue8(e.currentTarget.valueAsNumber)
            }}
          />
        </Box>
        <Box w="300px" h="70px">
          <b>Maksymalna moc silnika:</b>
          <Input
            bg="gray.500"
            type="number"
            value={filterValueLteHp}
            onChange={(e) => {
              setFilterValue7(e.currentTarget.valueAsNumber)
            }}
          />
        </Box>
      </Stack>
      <Stack direction={["column", "row"]} spacing="24px">
        <Box w="150px" h="70px">
          <b>Uszkodzenia:</b>{" "}
          <Select
            bg="gray.500"
            value={filterValueDamage}
            onChange={(e) => {
              setFilterValue10(e.currentTarget.value)
            }}
          >
            {optionsDamage.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </Select>
        </Box>
        <Box w="150px" h="70px">
          {" "}
          <b>Pierwszy właściciel:</b>
          <Select
            bg="gray.500"
            value={filterValueFirstOwner}
            onChange={(e) => {
              setFilterValue11(e.currentTarget.value)
            }}
          >
            {optionsOwner.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </Select>
        </Box>
        <Box w="150px" h="70px">
          {" "}
          <b> Miasto:</b>
          <Select
            bg="gray.500"
            value={filterValueCity}
            onChange={(e) => {
              setFilterValue12(e.currentTarget.value)
            }}
          >
            {optionsCity.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </Select>
        </Box>
        <Box w="150px" h="70px">
          <b> Rodzaj Paliwa:</b>
          <Select
            bg="gray.500"
            value={filterValueFuel}
            onChange={(e) => {
              setFilterValue3(e.currentTarget.value)
            }}
          >
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </Select>
        </Box>
      </Stack>
      <Flex
        alignItems="center"
        justifyContent="right"
        flexDirection="column"
        bgGradient="linear(gray.500,gray.600, gray.500)"
        boxShadow="lg"
        h="40vh"
        w="70vh"
      >
        <Center w="100px">
          <Text fontSize="3xl">
            {" "}
            <b>Znalezione samochody:</b>
          </Text>
        </Center>
        <Center w="700px">
          <div>
            <ul>
              {cars.map((car) => (
                <UnorderedList key={car.id}>
                  <Link href={Routes.ShowCarPage({ carId: car.id })}>
                    <a>
                      <ListItem
                        fontSize={"18px"}
                        color="blackAlpha.900"
                        fontWeight={"bold"}
                        lineHeight={"200%"}
                        fontFamily={"arial"}
                      >
                        {car.name +
                          " " +
                          car.model +
                          " (Cena: " +
                          car.price +
                          " zł" +
                          ", Przebieg: " +
                          car.mileage +
                          " kilometrów " +
                          ", Rocznik: " +
                          car.year +
                          " rok)"}
                      </ListItem>
                    </a>
                  </Link>
                </UnorderedList>
              ))}
            </ul>
          </div>
        </Center>
        <Stack spacing={5}>
          <Box
            color="white"
            borderRadius="lg"
            m={{ sm: 2, md: 2, lg: 11 }}
            p={{ sm: 2, md: 2, lg: 11 }}
          >
            <Center>
              {" "}
              <Button bg="gray.800" disabled={page === 0} onClick={goToPreviousPage}>
                Poprzednia stron
              </Button>
              <Button bg="gray.800" disabled={!hasMore} onClick={goToNextPage}>
                Następna strona
              </Button>
            </Center>

            <Box
              color="white"
              borderRadius="lg"
              m={{ sm: 2, md: 6, lg: 3 }}
              p={{ sm: 2, md: 2, lg: 3 }}
            >
              <Center>
                {" "}
                <Button bg="teal.500">
                  <Link href={Routes.Home()}>
                    <a>Strona główna</a>
                  </Link>
                </Button>
                <Button bg="teal.500">
                  <Link href={Routes.NewCarPage()}>
                    <a className="button small">
                      <strong>Dodaj ogłoszenie</strong>
                    </a>
                  </Link>
                </Button>
              </Center>
            </Box>
          </Box>
        </Stack>
      </Flex>
    </Flex>
  )
}

const CarsPage = () => {
  return (
    <Layout>
      <Head>
        <title>Ogłoszenia</title>
      </Head>

      <div>
        {/* <Button bg="teal.500">
          <Link href={Routes.NewCarPage()}>
            <a className="button small">
              <strong>Dodaj ogłoszenie</strong>
            </a>
          </Link>
        </Button> */}

        <Suspense fallback={<div>Loading...</div>}>
          <CarsList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default CarsPage
