import { Flex, Icon, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { TiDelete } from 'react-icons/ti';
interface ISpotTypeItemProps
{
    handleDelete: any,
    handleSelect: any,
    type: any
}

export const SpotTypeItem : FC<ISpotTypeItemProps> = ({type, handleDelete, handleSelect}) => {

  return (
    <Flex align="center"
    justify="space-between"
    borderColor="border"
    borderWidth="1px"
    paddingX={'1'}
    borderRadius={'10'}
    cursor={'pointer'}
    onClick={() => handleSelect(type)}>
      
      <Text fontSize={'15'}  isTruncated>{type.name}</Text>

      <Icon cursor={'pointer'}  as={TiDelete} boxSize={'7'} color={'red'} onClick={() => handleDelete(type.spottype_id)}>      
       </Icon>
    </Flex>
  )
}
