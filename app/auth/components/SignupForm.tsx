import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import Link from "next/link"
import { AuthenticationError, PromiseReturnType } from "blitz"
import { useState } from "react"
import { Signup } from "app/auth/validations"
import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
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
  // Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  useColorMode,
  useColorModeValue,
  FormLabel,
  Switch,
  Text,
} from "@chakra-ui/react"
type SignupFormProps = {
  onSuccess?: () => void
}

import { FaUserAlt, FaLock } from "react-icons/fa"
const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  const [showPassword, setShowPassword] = useState(false)
  const { toggleColorMode } = useColorMode()
  const formBackground = useColorModeValue("#EDF2F7", "#2D3748")
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      bg={formBackground}
      p={3}
      borderRadius={8}
      boxShadow="lg"
      h="120vh"
    >
      <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
        <Avatar bg="#009688" style={{ borderRadius: "50%" }} width="100px" />
        <Heading color="#26A69A">Witamy w FindCar</Heading>
        <Text fontFamily="'Open Sans', sans-serif">Zarejestruj się!</Text>
        <Box minW={{ base: "90%", md: "468px" }}>
          <Form
            schema={Signup}
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values) => {
              try {
                await signupMutation(values)
                props.onSuccess?.()
              } catch (error: any) {
                if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                  // This error comes from Prisma
                  return {
                    email:
                      "Podany adres email istnieje już w naszej bazie danych. Zaloguj się, jeśli to twoje konto!",
                  }
                } else {
                  return { [FORM_ERROR]: error.toString() }
                }
              }
            }}
          >
            <Stack spacing={10} p="3rem" backgroundColor={formBackground} boxShadow="md">
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    left="1.2cm"
                    children={<CFaUserAlt color="black" />}
                  />
                  <LabeledTextField name="email" label="Email" placeholder="adres@gmail.com" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    left="1.1cm"
                    children={<CFaLock color="black" />}
                  />
                  <LabeledTextField
                    name="password"
                    label="Hasło"
                    placeholder="Hasło"
                    type="password"
                  />
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={10}
                type="submit"
                variant="solid"
                bg="teal"
                width="full"
                h="5vh"
                color="black"
                _hover={{ bg: "#1D4044" }}
              >
                <Text fontFamily="'Open Sans', sans-serif">Zarejestruj</Text>
              </Button>
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="dark_mode" mb="0">
                  Włączyć tryb ciemny?
                </FormLabel>
                <Switch id="dark_mode" colorScheme="teal" size="lg" onChange={toggleColorMode} />
              </FormControl>
              <div style={{ marginTop: "1rem" }}>
                <Button bg="teal.400">
                  <Link href={Routes.LoginPage()}>
                    <a>Zaloguj się</a>
                  </Link>
                </Button>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <Button bg="teal.400">
                  <Link href={Routes.Home()}>
                    <a>Strona główna</a>
                  </Link>
                </Button>
              </div>
            </Stack>
          </Form>
        </Box>
      </Stack>
    </Flex>
  )
}

export default SignupForm
