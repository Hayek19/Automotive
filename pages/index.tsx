import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/users/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/carlogo.png"
import { useMutation } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Text,
  IconButton,
  Flex,
  Heading,
  Input,
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
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useBreakpointValue,
  useDisclosure,
  // Link,
} from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <Flex>
          <Box
            bgGradient="linear(gray.600, gray.700, gray.600)"
            color="white"
            borderRadius="lg"
            m={{ sm: 4, md: 16, lg: 10 }}
            p={{ sm: 5, md: 5, lg: 16 }}
            w="100%"
            h="250px"
          >
            <Button
              bg="teal.600"
              onClick={async () => {
                await logoutMutation()
              }}
            >
              Wyloguj
            </Button>
            <div style={{ marginTop: "1rem" }}>
              <Button bg="teal.600">
                <Link href="/cars">
                  <strong>Samochody</strong>
                </Link>
              </Button>
            </div>
            <div style={{ marginTop: "1rem" }}>
              <Button bg="teal.600">
                <Link href="/car-parts">
                  <strong>Cześci samochodowe</strong>
                </Link>
              </Button>
            </div>{" "}
          </Box>
        </Flex>

        {/* <div>
          ID użytkownika: <code>{currentUser.id}</code>
          <br />
          Typ użytkownika: <code>{currentUser.role}</code>
        </div> */}
      </>
    )
  } else {
    return (
      <>
        <Flex>
          <Box
            bgGradient="linear(gray.600, gray.700, gray.600)"
            color="white"
            borderRadius="lg"
            m={{ sm: 4, md: 16, lg: 10 }}
            p={{ sm: 5, md: 5, lg: 16 }}
            w="100%"
            h="250px"
          >
            <Button bg="teal.600">
              <Link href={Routes.SignupPage()}>
                <strong>Rejestracja</strong>
              </Link>
            </Button>
            <div style={{ marginTop: "1rem" }}>
              <Button bg="teal.600">
                <Link href={Routes.LoginPage()}>
                  <strong>Logowanie</strong>
                </Link>
              </Button>
            </div>
          </Box>
        </Flex>
        {/* <div style={{ marginTop: "3rem" }}>
          <Button>
            <Link href={Routes.SignupPage()}>
              <a className="button small">
                <strong>Rejestracja</strong>
              </a>
            </Link>
          </Button>
        </div>
        <div style={{ marginTop: "3rem" }}>
          <Button>
            <Link href={Routes.LoginPage()}>
              <a className="button small">
                <strong>Logowanie</strong>
              </a>
            </Link>
          </Button>
        </div> */}
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <div className="container">
        <main>
          {/* <div className="logo">
            <Image src={`${logo.src}`} alt="blitzjs" width="350px" height="330px" layout="fixed" />
          </div> */}
          <div className="findcar">
            <h1 text-align="center">
              <strong>
                <header>
                  FindCar <SearchIcon boxSize={39} />
                </header>
              </strong>
            </h1>
            <h2>Utwórz konto lub zaloguj się aby korzystać z serwisu ogłoszeń motoryzacyjnych</h2>
          </div>

          <div className="buttons" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <Suspense fallback="Loading...">
              <UserInfo />
            </Suspense>
          </div>
          <div></div>
        </main>

        <footer>
          <a
            href="https://blitzjs.com?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        </footer>

        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300;700&display=swap");

          html,
          body {
            background-image: linear-gradient(#eeeeee, #757575, #212121);
            padding: 0;
            margin: 0;
            font-family: "Libre Franklin", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          }

          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            box-sizing: border-box;
          }
          .container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          main {
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .findcar {
            font-size: 2rem;
          }

          main p {
            font-size: 1.2rem;
          }

          p {
            text-align: center;
          }

          footer {
            width: 100%;
            height: 60px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #45009d;
          }

          footer a {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          footer a {
            color: #f4f4f4;
            text-decoration: none;
          }

          .logo {
            margin-bottom: 2rem;
            background-color: #e0e0e0;
          }

          .logo img {
            width: 300px;
          }

          .buttons {
            display: grid;
            grid-auto-flow: column;
            grid-gap: 0.5rem;
          }
          .button {
            font-size: 1rem;
            background-color: #6700eb;
            padding: 1rem 2rem;
            color: #f4f4f4;
            text-align: center;
          }

          .button.small {
            padding: 0.5rem 1rem;
          }

          .button:hover {
            background-color: #45009d;
          }

          .button-outline {
            border: 2px solid #6700eb;
            padding: 1rem 2rem;
            color: #6700eb;
            text-align: center;
          }

          .button-outline:hover {
            border-color: #45009d;
            color: #45009d;
          }
          h1 {
            text-align: center;
            font-size: 60px;
          }
          pre {
            background: #fafafa;
            border-radius: 5px;
            padding: 0.75rem;
            text-align: center;
          }
          code {
            font-size: 0.9rem;
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
              Bitstream Vera Sans Mono, Courier New, monospace;
          }

          .grid {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;

            max-width: 800px;
            margin-top: 3rem;
          }

          @media (max-width: 600px) {
            .grid {
              width: 100%;
              flex-direction: column;
            }
          }
        `}</style>
      </div>
    </Layout>
  )
}

export default Home
