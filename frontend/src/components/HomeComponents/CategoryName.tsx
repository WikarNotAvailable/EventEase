import React from 'react'
import {  Text } from '@chakra-ui/react'

export const CategoryName = (props :{categoryName:string}) => {
  return (
    <Text fontFamily={'heading'}
              fontSize={30}
              fontWeight={'bold'}
              borderBottomColor={'#7b59ff'}  
              borderBottomWidth={5}
              marginBottom={2}
              cursor={'pointer'}
              >
          {props.categoryName}
        </Text>
  )
}
