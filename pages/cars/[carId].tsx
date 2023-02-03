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
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Box,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  Divider,
  ButtonGroup,
  Table,
  TableContainer,
  Tr,
  Th,
  Td,
  Tbody,
  TableCaption,
  Thead,
  Tfoot,
} from "@chakra-ui/react"
import {
  chakra,
  Container,
  Flex,
  VStack,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
} from "@chakra-ui/react"
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"
import { MdLocalShipping } from "react-icons/md"
export const Car = () => {
  const router = useRouter()
  const carId = useParam("carId", "number")
  const [deleteCarMutation] = useMutation(deleteCar)
  const [car] = useQuery(getCar, { id: carId })

  return (
    <>
      <Flex bg="gray.300">
        <Container maxW={"7xl"}>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}
          >
            <Flex>
              <Image
                rounded={"md"}
                alt={"product image"}
                src={
                  "https://images.unsplash.com/photo-1596516109370-29001ec8ec36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODE1MDl8MHwxfGFsbHx8fHx8fHx8fDE2Mzg5MzY2MzE&ixlib=rb-1.2.1&q=80&w=1080"
                }
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={{ base: "100%", sm: "400px", lg: "500px" }}
              />
            </Flex>

            <Stack spacing={{ base: 6, md: 10 }}>
              <Box as={"header"}>
                <Button bg="teal.500" style={{ marginLeft: "0.5rem", textAlign: "center" }}>
                  <Link href={Routes.CarsPage()}>
                    <a>Wszystkie ogłoszenia</a>
                  </Link>
                </Button>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                >
                  {car.name + " " + car.model}
                </Heading>
                <Text
                  color={useColorModeValue("gray.900", "gray.400")}
                  fontWeight={300}
                  fontSize={"2xl"}
                >
                  {"Cena: " + car.price + " PLN"}
                </Text>
              </Box>
              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={"column"}
                divider={<StackDivider borderColor={useColorModeValue("gray.200", "gray.600")} />}
              >
                <VStack spacing={{ base: 4, sm: 6 }}>
                  <Text
                    color={useColorModeValue("gray.500", "gray.400")}
                    fontSize={"2xl"}
                    fontWeight={"300"}
                  >
                    {car.description}
                  </Text>
                </VStack>
              </Stack>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("yellow.500", "yellow.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Dane techniczne
                </Text>

                <List spacing={2}>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Model:
                    </Text>{" "}
                    {car.model}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Marka:
                    </Text>{" "}
                    {car.name}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Rok produkcji:
                    </Text>{" "}
                    {car.year}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Rodzaj paliwa:
                    </Text>{" "}
                    {car.fuel}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Przebieg:
                    </Text>{" "}
                    {car.mileage + " kilometrów"}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Objętość Silnika:
                    </Text>{" "}
                    {car.engine + " cm³"}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Moc Silnika:
                    </Text>{" "}
                    {car.hp + " koni mechanicznych"}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Ilosc drzwi:
                    </Text>{" "}
                    {car.doors}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Pierwszy własciciel:
                    </Text>{" "}
                    {car.firstOwner}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Uszkodzony:
                    </Text>{" "}
                    {car.damage}
                  </ListItem>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={useColorModeValue("yellow.500", "yellow.300")}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Dane kontaktowe
                  </Text>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Miasto:
                    </Text>{" "}
                    {car.city}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Numer telefonu:
                    </Text>{" "}
                    {"+48 " + car.phone}
                  </ListItem>
                </List>
              </Box>
              <Button style={{ marginLeft: "0.5rem" }} bg="teal.500">
                <Link href={Routes.EditCarPage({ carId: car.id })}>
                  <a>Edytuj ogłoszenie </a>
                </Link>
                <EditIcon w={26} h={26} />
              </Button>
              <Button
                bg="red.600"
                type="button"
                onClick={async () => {
                  if (window.confirm("Ogłoszenie zostanie usunięte")) {
                    await deleteCarMutation({ id: car.id })
                    await router.push(Routes.CarsPage())
                  }
                }}
                style={{ marginLeft: "0.5rem" }}
              >
                <a> Usuń ogłoszenie</a>
                <DeleteIcon w={26} h={26} />
              </Button>
            </Stack>
          </SimpleGrid>
        </Container>
      </Flex>
    </>
  )
}

const ShowCarPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Car />
      </Suspense>
    </div>
  )
}

ShowCarPage.authenticate = true
ShowCarPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowCarPage
