import { AuthenticationError, PromiseReturnType } from "blitz"
import { useState } from "react"
import Link from "next/link"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { useMutation } from "@blitzjs/rpc"
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
} from "@chakra-ui/react"

import { FaUserAlt, FaLock } from "react-icons/fa"
const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  const [showPassword, setShowPassword] = useState(false)
  const { toggleColorMode } = useColorMode()
  const formBackground = useColorModeValue("#EDF2F7", "#2D3748")

  const handleShowClick = () => setShowPassword(!showPassword)
  return (
    <Flex h="100vh" alignItems="center" justifyContent="center" bg="#EDF2F7">
      <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        bg={formBackground}
        p={3}
        borderRadius={8}
        boxShadow="lg"
        h="80vh"
        width="60vh"
      >
        <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
          <Avatar bg="#009688" style={{ borderRadius: "50%" }} width="150px" />
          <Heading color="#26A69A">Witamy w FindCar</Heading>
          <Text fontFamily="'Open Sans', sans-serif">Zaloguj się!</Text>
          <Box minW={{ base: "90%", md: "468px" }}>
            <Form
              schema={Login}
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values) => {
                try {
                  const user = await loginMutation(values)
                  props.onSuccess?.(user)
                } catch (error: any) {
                  if (error instanceof AuthenticationError) {
                    return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
                  } else {
                    return {
                      [FORM_ERROR]:
                        "Sorry, we had an unexpected error. Please try again. - " +
                        error.toString(),
                    }
                  }
                }
              }}
            >
              <Stack spacing={10} p="3rem" backgroundColor="#E2E8F0" boxShadow="md">
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
                  <Text fontFamily="'Open Sans', sans-serif">Login</Text>
                </Button>
              </Stack>
            </Form>
          </Box>
        </Stack>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="dark_mode" mb="0">
            Włączyć tryb ciemny?
          </FormLabel>
          <Switch id="dark_mode" colorScheme="teal" size="lg" onChange={toggleColorMode} />
        </FormControl>
        <div>
          <Link href={Routes.ForgotPasswordPage()}>
            <a>Zapomniałeś hasła?</a>
          </Link>
        </div>
        <div style={{ marginTop: "1rem" }}>
          Lub jeśli nie masz jeszcze konta{" "}
          <Link color="black" href={Routes.SignupPage()}>
            <a>Zarejestruj się!</a>
          </Link>
        </div>
        <div>
          <Link href={Routes.Home()}>
            <a>Strona główna</a>
          </Link>
        </div>
      </Flex>
    </Flex>
  )
}

export default LoginForm

// body {
//   text-align: center;
// }
