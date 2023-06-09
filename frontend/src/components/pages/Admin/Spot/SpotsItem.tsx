import { Flex, Icon, Image, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { TiDelete } from 'react-icons/ti';
interface ISpotItemProps
{
    handleDelete: any,
    handleSelect: any,
    spot: any
}

export const SpotItem : FC<ISpotItemProps> = ({spot, handleDelete, handleSelect}) => {

  return (
    <Flex align="center"
    justify="space-between"
    borderColor="border"
    borderWidth="1px"
    paddingX={'5'}
    borderRadius={'10'}
    cursor={'pointer'}
    onClick={() => handleSelect(spot)}>
      <Text fontSize={'25'} margin={'5'} isTruncated>{spot.name}</Text>

      <Icon cursor={'pointer'}  as={TiDelete} boxSize={'7'} color={'red'} onClick={() => handleDelete(spot.spot_id)}>      
       </Icon>
    </Flex>
  )
}


