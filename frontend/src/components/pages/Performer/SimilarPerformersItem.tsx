import { Flex, Text, Image } from '@chakra-ui/react'
import React from 'react'

export const SimilarPerformersItem = () => {
  return (
    <Flex alignItems={'center'}       
        cursor={'pointer'} 
        paddingX={'5'}
        borderRadius={'10'}
        borderColor="border"
        borderWidth="1px">
      <Image src="/assets/photos/lostFrequencies.png" width="69px" height="69px" borderRadius={'100%'}/>
      <Text fontSize={'25'} textAlign={'center'} margin={'5'} isTruncated>Lost Frequencies</Text>
    </Flex>
  )
}


