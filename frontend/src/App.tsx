import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { Wrapper } from "./components/global/wrapper/Wrapper"
import { theme } from "./theme/theme"
import '@fontsource/inter';
import { UserContextProvider } from "./provider/user";

export const App = () => (
  <ChakraProvider theme={theme}>
    <UserContextProvider>
      <Wrapper />
    </UserContextProvider>
  </ChakraProvider>
)
