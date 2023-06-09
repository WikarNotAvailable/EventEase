import { Flex, Icon, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { TiDelete } from 'react-icons/ti';
interface IArtistTypeItemProps
{
    handleDelete: any,
    handleSelect: any,
    type: any
}

export const ArtistTypeItem : FC<IArtistTypeItemProps> = ({type, handleDelete, handleSelect}) => {

  return (
    <Flex align="center"
    justify="space-between"
    borderColor="border"
    borderWidth="1px"
    paddingX={'1'}
    borderRadius={'10'}
    cursor={'pointer'}
    onClick={() => handleSelect(type)}>
      
      <Text fontSize={'15'}  isTruncated>{type.type}</Text>

      <Icon cursor={'pointer'}  as={TiDelete} boxSize={'7'} color={'red'} onClick={() => handleDelete(type.performertype_id)}>      
       </Icon>
    </Flex>
  )
}
