import { Text, Flex, Button } from '@chakra-ui/react'
import { FC } from 'react'

interface IPerformerEventsItemProps {
  name:string,
  city:string,
  start_date:string
  end_date:string
}

export const PerformerEventsItem : FC<IPerformerEventsItemProps> = ({name, city, start_date, end_date}) => {
    
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
            <Text textColor={"#101828"}
                fontFamily={"monospace"}
                fontSize={25}
                fontWeight={'light'}>
                {`${name} - ${city} - ${start_date}-${end_date}`}
            </Text>
            <Button textColor={"#101828"} backgroundColor="primary" _hover={{backgroundColor: "secondary"}} 
                  isTruncated textOverflow={'ellipsis'} >
                Buy ticket
            </Button>

        </Flex>
  )
}

