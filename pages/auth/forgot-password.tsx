import Layout from "app/core/layouts/Layout"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { ForgotPassword } from "app/auth/validations"
import forgotPassword from "app/auth/mutations/forgotPassword"
import { useMutation } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"
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
import { EmailIcon } from "@chakra-ui/icons"
import { FaUserAlt, FaLock } from "react-icons/fa"
const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)
  const CFaUserAlt = chakra(FaUserAlt)
  return (
    <Flex h="100vh" alignItems="center" justifyContent="center" bg="#EDF2F7">
      {isSuccess ? (
        <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
          <Text as="b" fontSize="40px">
            Zaakceptowano prośbę o przypomnienie hasła
          </Text>
          <Text fontSize="30px">
            Jeśli wskazany adres email znajduje się w naszej bazie danych, wkrótce otrzymasz
            wiadomość z przypomnieniem hasła.
          </Text>
        </Stack>
      ) : (
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          bg="#EDF2F7"
          p={3}
          borderRadius={8}
          boxShadow="lg"
          h="80vh"
          width="60vh"
        >
          <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
            <EmailIcon w={70} h={70} color="#009688" />
            <Heading color="#26A69A">Formularz przypomnienia hasła</Heading>
            <Text fontFamily="'Open Sans', sans-serif">Przypomnij hasło</Text>
            <Box minW={{ base: "90%", md: "468px" }}>
              <Form
                schema={ForgotPassword}
                initialValues={{ email: "" }}
                onSubmit={async (values) => {
                  try {
                    await forgotPasswordMutation(values)
                  } catch (error: any) {
                    return {
                      [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
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
                      <LabeledTextField name="email" label="Email" placeholder="Email" />
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
                    <Text fontFamily="'Open Sans', sans-serif">Wyślij</Text>
                  </Button>
                </Stack>
              </Form>
            </Box>
          </Stack>
          {/* <div>
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
        </div> */}
        </Flex>
      )}
    </Flex>
  )
}

export default ForgotPasswordPage
