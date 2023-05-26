import { Flex, Tooltip, Icon,Text, Box } from "@chakra-ui/react"
import { FC } from "react"
import { CiBeerMugFull } from "react-icons/ci"
import { Link } from "react-router-dom"

interface IArtistNameProps {
    text: string
  }

export const ArtistNameBar : FC<IArtistNameProps> = ({text}) =>  {
  return (
    <Flex   backgroundColor="primary"
            borderBottomRadius={'10'}
            justify={'space-between'}
            align={'center'}
            height={"15%"}>

        <Text textAlign={'left'} 
            fontSize={'24'} 
            paddingLeft={'5'}
            >
                {text}
        </Text>
        <Tooltip label={`Go to ${text} events`} bg="secondary">
            <Link to="/">
                <Box marginRight={'5'} 
                    borderRadius={"100%"}
                    _hover={{opacity:"0.6"}}>
                    <Icon   as={CiBeerMugFull} 
                            boxSize={'7'} 
                            >      
                    </Icon>
                </Box>
            </Link>
            
            
        </Tooltip>
    
</Flex>
  )
}


