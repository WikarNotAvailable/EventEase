import { Flex, Text, Image } from '@chakra-ui/react'
import { FC } from 'react'
import { Link } from 'react-router-dom'

interface ISimilarPerformersItemProps
{
    url:string,
    name:string
}

export const SimilarPerformersItem: FC<ISimilarPerformersItemProps> = ({name, url}) => {
  return (
    <Link to={`/artist/${name}`} reloadDocument>
      <Flex alignItems={'center'}       
          cursor={'pointer'} 
          paddingX={'5'}
          borderRadius={'10'}
          borderColor="border"
          borderWidth="1px">
          
              <Image src={url} width="80px" height="59px" borderRadius={'15'}/>
              <Text fontSize={'25'} textAlign={'center'} margin={'5'} isTruncated>{name}</Text>
            

      </Flex>
    </Link>
  )
}


