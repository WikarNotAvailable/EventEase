import React, { FC } from 'react'
import {  Text } from '@chakra-ui/react'

interface ICategoryNameProps {
  text: string
}

export const CategoryName: FC<ICategoryNameProps> = ({text}) => {
  return (
    <Text
      fontSize="24px"
      fontWeight='600'
      borderBottomColor="secondary"
      borderBottomWidth="4px"
      mb="16px"
      cursor='pointer'>
          {text}
      </Text>
  )
}
