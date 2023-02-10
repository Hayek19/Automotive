import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"
import Link from "next/link"
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
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  useColorMode,
  useColorModeValue,
  FormLabel,
  Switch,
  Text,
  Select,
  SimpleGrid,
  Center,
} from "@chakra-ui/react"
import { Dropzone } from "app/core/components/Dropzone"
export function CarPartForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
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
              <LabeledTextField name="name" label="Nazwa" placeholder="Nazwa" />
              <LabeledTextField name="type" label="Typ" placeholder="Typ" />
              <LabeledTextField name="brand" label="Marka" placeholder="Marka" />
              <LabeledTextField name="model" label="Model" placeholder="Model" />
              <LabeledTextField name="fuel" label="Paliwo" placeholder="Paliwo" />
              <LabeledTextField name="description" label="Opis" placeholder="Opis" />
              <LabeledTextField name="engine" label="Silnik" placeholder="Silnik" type="number" />
              <Box>
                <Text>Miasto:</Text>
                <Select color="black" w="200px" name="city" label="Miasto" placeholder="Miasto">
                  <option color="red" value="option1">
                    Łódź
                  </option>
                  <option value="option2">Tuszyn</option>
                  <option value="option3">Rzgów</option>
                </Select>
              </Box>
              <LabeledTextField
                name="phone"
                label="Numer telefonu"
                placeholder="Numer telefonu"
                type="number"
              />
              <LabeledTextField name="price" label="Cena" placeholder="Cena" type="number" />
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
