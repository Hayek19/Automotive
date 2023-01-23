import React from "react"
import { AuthenticationError, PromiseReturnType } from "blitz"
import { useState } from "react"
// import Link from "next/link"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset,
  Box,
  Flex,
  IconButton,
  useColorMode,
  Heading,
  Text,
  Link,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Checkbox,
  Button,
} from "@chakra-ui/react"
type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}
const VARIANT_COLOR = "teal"

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <LoginArea />
      </ColorModeProvider>
    </ThemeProvider>
  )
}

const LoginArea = () => {
  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <Box
        borderWidth={1}
        px={4}
        width="full"
        maxWidth="500px"
        borderRadius={4}
        textAlign="center"
        boxShadow="lg"
      >
        <ThemeSelector />
        <Box p={4}>
          <LoginHeader />
          <LoginForm />
        </Box>
      </Box>
    </Flex>
  )
}

const ThemeSelector = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box textAlign="right" py={4}>
      <IconButton
        icon={colorMode === "light" ? "moon" : "sun"}
        onClick={toggleColorMode}
        variant="ghost"
      />
    </Box>
  )
}

const LoginHeader = () => {
  return (
    <Box textAlign="center">
      <Heading>Sign In to Your Account</Heading>
      <Text>
        Or <Link color={`${VARIANT_COLOR}.500`}>start your 14 days trial</Link>
      </Text>
    </Box>
  )
}

const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Box my={8} textAlign="left">
      <form>
        <Form
          submitText="SJOdjapojdpo"
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
                    "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
                }
              }
            }
          }}
        >
          <FormControl>
            <LabeledTextField name="email" label="Email" placeholder="adres@gmail.com" />
          </FormControl>

          <FormControl mt={4}>
            <LabeledTextField
              w={10}
              name="password"
              label="Hasło"
              placeholder="Hasło"
              type="password"
            />
          </FormControl>

          <Stack isInline justifyContent="space-between" mt={4}>
            <Box>
              <Checkbox>Remember Me</Checkbox>
            </Box>
            <Box>
              <Link color={`${VARIANT_COLOR}.500`}>Forgot your password?</Link>
            </Box>
          </Stack>

          <Button variantColor={VARIANT_COLOR} width="full" mt={4}>
            Sign In
          </Button>
        </Form>
      </form>
    </Box>
  )
}

export default App
