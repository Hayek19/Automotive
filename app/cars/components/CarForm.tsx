import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"
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
} from "@chakra-ui/react"
import { Dropzone } from "app/core/components/Dropzone"

export function CarForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
      <Form<S> {...props}>
        <Dropzone name="photoUrl" />
        <Box>
          <SimpleGrid
            columns={{ base: 2, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}
          >
            <LabeledTextField name="name" label="Marka" placeholder="marka" />
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
            <LabeledTextField name="phone" label="Telefon" placeholder="Telefon" />
            <LabeledTextField name="doors" label="Ilość drzwi" placeholder="drzwi" type="number" />
            <LabeledTextField name="damage" label="Uszkodzony" placeholder="Uszkodzony" />
            <LabeledTextField
              name="firstOwner"
              label="Pierwszy właściciel"
              placeholder="Pierwszy właściciel"
            />
          </SimpleGrid>
        </Box>
      </Form>
    </Stack>
  )
}
