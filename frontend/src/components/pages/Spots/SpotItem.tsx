import { Flex, Image} from '@chakra-ui/react'
import { SpotNameBar } from './SpotNameBar'
import { Link } from 'react-router-dom'
import { FC } from 'react'

interface ISpotItemProps
{
  name: string,
  imageUrl: string
}

export const SpotItem : FC<ISpotItemProps> = ({name, imageUrl}) => {
  return (
    <Flex direction={'column'} borderRadius={'10'} 
        _hover={{transform: "scale(1.03)", transition:"transform 0.2s ease-in-out"}}
        cursor={'pointer'}
       >
        <Link to={`/spot/${name}`}> 
            <Image src={imageUrl} borderTopRadius={'10'} objectFit={'fill'} height={'85%'} width={'100%'} overflow={'hidden'}>

            </Image>
            <SpotNameBar text={name}/>
        </Link>
        

        
    </Flex>

    
  )
}

