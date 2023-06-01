import { Flex, Image, Text } from '@chakra-ui/react'
import { FC } from 'react'

interface IPerformerInfoProps
{
    name: string,
    description: string,
    url: string
}

export const PerformerInfo: FC<IPerformerInfoProps> = ({name, description, url}) =>{
  return (
    <Flex direction={'column'} flex={'7 1 0'} borderRadius={'10'}>
        <Image src={url} borderTopRadius={'10'}>

        </Image>

        <Text textAlign={'left'} 
            fontSize={'3xl'} 
            fontWeight={'bold'}
            backgroundColor="primary"
            borderBottomRadius={'10'}
            paddingLeft={'5'}
            textColor={"#101828"}
            >
                {name}
        </Text>

        <Text borderColor="border"
              borderWidth="4px"
              borderRadius={'10'}
              marginTop={'5'}
              padding={'3'}
              textColor={"#101828"}>
            

          {description}
        </Text>
    </Flex>
  )
}

