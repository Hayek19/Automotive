import Layout from "app/core/layouts/Layout"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { ResetPassword } from "app/auth/validations"
import resetPassword from "app/auth/mutations/resetPassword"
import { BlitzPage, Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Link from "next/link"
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
} from "@chakra-ui/react"
import { EmailIcon } from "@chakra-ui/icons"
import { FaUserAlt, FaLock } from "react-icons/fa"
const ResetPasswordPage: BlitzPage = () => {
  const router = useRouter()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center" bg="#EDF2F7">
      {isSuccess ? (
        <div>
          <h2>Password Reset Successfully</h2>
          <p>
            Go to the <Link href={Routes.Home()}>homepage</Link>
          </p>
        </div>
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
            <Heading color="#26A69A">Zmiana hasła</Heading>
            <Text fontFamily="'Open Sans', sans-serif">
              Wypełnij formularz aby zmienić swoje hasło
            </Text>
            <Box minW={{ base: "90%", md: "468px" }}>
              <Form
                schema={ResetPassword}
                initialValues={{
                  password: "",
                  passwordConfirmation: "",
                  token: router.query.token as string,
                }}
                onSubmit={async (values) => {
                  try {
                    await resetPasswordMutation(values)
                  } catch (error: any) {
                    if (error.name === "ResetPasswordError") {
                      return {
                        [FORM_ERROR]: error.message,
                      }
                    } else {
                      return {
                        [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
                      }
                    }
                  }
                }}
              >
                <Stack spacing={10} p="3rem" backgroundColor="#E2E8F0" boxShadow="md">
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" left="1.2cm" />
                      <LabeledTextField name="password" label="Nowe hasło" type="password" />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" left="1.2cm" />
                      <LabeledTextField
                        name="passwordConfirmation"
                        label="Powtórz nowe hasło"
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
                    <Text fontFamily="'Open Sans', sans-serif">Wyślij</Text>
                  </Button>
                </Stack>
              </Form>
            </Box>
          </Stack>
        </Flex>
      )}
    </Flex>
  )
}

ResetPasswordPage.redirectAuthenticatedTo = "/"
ResetPasswordPage.getLayout = (page) => <Layout title="Reset Your Password">{page}</Layout>

export default ResetPasswordPage
