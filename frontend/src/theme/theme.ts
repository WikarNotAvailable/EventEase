import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";

export const theme = extendTheme({
    colors: colors,
    config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  fonts: {
    body: `'Inter'`,
  },
  styles: {
    global: () => ({
      body: {
        bg: '#F9FAFB',
        color: '#000000'
      },
    }),
  },
})