import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
import Link from "next/link"
export { FORM_ERROR } from "app/core/components/Form"
import { Routes } from "@blitzjs/next"
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  //Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  useColorMode,
  useColorModeValue,
  FormLabel,
  Switch,
  Text,
  SimpleGrid,
  Center,
} from "@chakra-ui/react"
import { Dropzone } from "app/core/components/Dropzone"

export function CarForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
      <Form<S> {...props}>
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
            <Center>
              <Text fontSize={"40px"}>Wypełnij wszystkie pola aby dodać ogłoszenie!</Text>
            </Center>
            <SimpleGrid
              columns={{ base: 4, lg: 4 }}
              spacing={{ base: 8, md: 10 }}
              py={{ base: 18, md: 24 }}
            >
              <LabeledTextField color="red" name="name" label="Marka" placeholder="marka" />
              <LabeledTextField name="model" label="Model" placeholder="model" />
              <LabeledTextField name="fuel" label="Paliwo" placeholder="paliwo" />
              <LabeledTextField
                name="mileage"
                label="Przebieg"
                placeholder="przebieg"
                type="number"
              />
              <LabeledTextField name="year" label="Rocznik" placeholder="rocznik" type="number" />
              <LabeledTextField name="price" label="Cena" placeholder="cena" type="number" />
              <LabeledTextField name="description" label="Opis" placeholder="opis" />
              <LabeledTextField
                name="hp"
                label="Moc Silnika"
                placeholder="moc silnika"
                type="number"
              />
              <LabeledTextField
                name="engine"
                label="Pojemność silnika"
                placeholder="pojemność silnika"
                type="number"
              />
              <LabeledTextField name="city" label="Miasto" placeholder="Miasto" />
              <LabeledTextField name="phone" label="Numer telefonu" placeholder="Numer telefonu" />
              <LabeledTextField
                name="doors"
                label="Ilość drzwi"
                placeholder="drzwi"
                type="number"
              />
              <LabeledTextField name="damage" label="Uszkodzony" placeholder="Uszkodzony" />
              <LabeledTextField
                name="firstOwner"
                label="Pierwszy właściciel"
                placeholder="Pierwszy właściciel"
              />
              <Dropzone name="photoUrl" />
            </SimpleGrid>
            <Stack spacing={10} p="3rem" boxShadow="md">
              <Center>
                <p>
                  <Button bg="teal.400">Dodaj ogłoszenie</Button>
                </p>
              </Center>
              <Center>
                <p>
                  <Button bg="teal.400">
                    <Link href={Routes.CarsPage()}>
                      <a>Powrót do ogłoszeń</a>
                    </Link>
                  </Button>
                </p>
              </Center>
            </Stack>
          </Box>
        </Flex>
      </Form>
    </Stack>
  )
}
