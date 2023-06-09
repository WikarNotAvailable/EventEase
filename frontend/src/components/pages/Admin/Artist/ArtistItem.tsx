import { Flex, Icon, Image, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { TiDelete } from 'react-icons/ti';
interface IArtistitemProps
{
    handleDelete: any,
    handleSelect: any,
    artist: any
}

export const ArtistItem : FC<IArtistitemProps> = ({artist, handleDelete, handleSelect}) => {

  return (
    <Flex align="center"
    justify="space-between"
    borderColor="border"
    borderWidth="1px"
    paddingX={'5'}
    borderRadius={'10'}
    cursor={'pointer'}
    onClick={() => handleSelect(artist)}>
      <Text fontSize={'25'} margin={'5'} isTruncated>{artist.name}</Text>

      <Icon cursor={'pointer'}  as={TiDelete} boxSize={'7'} color={'red'} onClick={() => handleDelete(artist.performer_id)}>      
       </Icon>
    </Flex>
  )
}


