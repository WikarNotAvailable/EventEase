import { Text } from '@chakra-ui/react'
import React, { FC } from 'react'

interface INavLinkProps {
    text: string
}

export const NavLink: FC<INavLinkProps> = ({text}) => {
  return (
      <Text color="textPrimary" fontSize="16px" _hover={{ opacity: '0.7' }}>{text}</Text>
  )
}
