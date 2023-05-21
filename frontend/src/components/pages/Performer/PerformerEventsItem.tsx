import { Text, Flex, Button } from '@chakra-ui/react'

export const PerformerEventsItem = () => {
    
  return (
    <Flex  
          borderRadius={10} 
          padding={5}          

          justify={'space-between'}
          backgroundColor="#f2edec"
          marginTop={'2'}
          cursor={'pointer'}
          _hover={{backgroundColor: "#f2edff"}}
          >
            <Text textColor={'black'}
                fontFamily={"monospace"}
                fontSize={25}
                fontWeight={'light'}>
                Loolapalooza - Rio de Janeiro - 31.12.2023
            </Text>
            <Button backgroundColor="primary" _hover={{backgroundColor: "secondary"}} isTruncated textOverflow={'ellipsis'} >
                Buy ticket
            </Button>

        </Flex>
  )
}

