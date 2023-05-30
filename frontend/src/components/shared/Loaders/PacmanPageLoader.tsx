import { PacmanLoader } from 'react-spinners'
import { Flex } from '@chakra-ui/react'

export const PacmanPageLoader = () => {
    return(
      <Flex justify={'center'} width={"100%"} height={"100%"} paddingY={"20px"}>
          <PacmanLoader color="#4D5382" />
      </Flex>
        
      )
}

