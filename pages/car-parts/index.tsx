import { Suspense, useState } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import getCarParts from "app/car-parts/queries/getCarParts"
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
const ITEMS_PER_PAGE = 4
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
const options2 = [
  {
    label: "Wszystkie",
    value: "",
  },
  {
    label: "Zawieszenie",
    value: "Zawieszenie",
  },
  {
    label: "Napęd",
    value: "Napęd",
  },
  {
    label: "Układ hamulcowy",
    value: "Układ hamulcowy",
  },
  {
    label: "Układ  elektryczny",
    value: "Układ  elektryczny",
  },
]
export const CarPartsList = () => {
  const router = useRouter()
  const [filterValueName, setFilterValue] = useState("")
  const [filterValuBrand, setFilterValue1] = useState("")
  const [filterValueModel, setFilterValue2] = useState("")
  const [filterValueFuel, setFilterValue3] = useState("")
  const [filterValueGtePrice, setFilterValue4] = useState<number>()
  const [filterValueLtePrice, setFilterValue5] = useState<number>()
  const [filterValueGteYear, setFilterValue6] = useState<number>()
  const [filterValueLteYear, setFilterValue7] = useState<number>()
  const [filterValueEngine, setFilterValue9] = useState<number>()
  const [filterValueType, setFilterValue11] = useState("")
  const [filterValueCity, setFilterValue12] = useState("")
  const page = Number(router.query.page) || 0
  const [{ carParts, hasMore }] = usePaginatedQuery(getCarParts, {
    orderBy: { id: "asc" },

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
            value={filterValuBrand}
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
          <b>Nazwa cześci:</b>
          <Input
            bg="gray.500"
            value={filterValueName}
            onChange={(e) => {
              setFilterValue(e.currentTarget.value)
            }}
          />
        </Box>
        <Box w="300px" h="70px">
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
            value={filterValueLtePrice}
            onChange={(e) => {
              setFilterValue5(e.currentTarget.valueAsNumber)
            }}
          />
        </Box>
      </Stack>
      <Stack direction={["column", "row"]} spacing="24px">
        <Box w="300px" h="70px">
          <b>Typ części:</b>
          <Select
            bg="gray.500"
            value={filterValueType}
            onChange={(e) => {
              setFilterValue3(e.currentTarget.value)
            }}
          >
            {options2.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </Select>
        </Box>
        <Box w="300px" h="70px">
          <b>Pojemność silnika:</b>
          <Input
            bg="gray.500"
            value={filterValueEngine}
            onChange={(e) => {
              setFilterValue2(e.currentTarget.value)
            }}
          />
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
            <b>Części:</b>
          </Text>
        </Center>
        <Center w="700px">
          <div>
            <ul>
              {carParts.map((carPart) => (
                <UnorderedList key={carPart.id}>
                  <Link href={Routes.ShowCarPage({ carPartId: carPart.id })}>
                    <a>
                      <ListItem
                        fontSize={"18px"}
                        color="blackAlpha.900"
                        fontWeight={"bold"}
                        lineHeight={"200%"}
                        fontFamily={"arial"}
                      >
                        {carPart.name + carPart.price + " zł"}
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
                  <Link href={Routes.NewCarPartPage()}>
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

const CarPartsPage = () => {
  return (
    <Layout>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <CarPartsList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default CarPartsPage
