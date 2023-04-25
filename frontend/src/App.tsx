import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { Wrapper } from "./components/global/wrapper/Wrapper"
import { theme } from "./theme/theme"
import '@fontsource/inter';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Wrapper />
  </ChakraProvider>
)
