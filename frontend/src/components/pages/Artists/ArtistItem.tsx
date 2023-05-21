import { Flex, Image} from '@chakra-ui/react'
import { ArtistNameBar } from './ArtistNameBar'
import { Link } from 'react-router-dom'


export const ArtistItem = () => {
  return (
    <Flex direction={'column'} borderRadius={'10'} 
        _hover={{transform: "scale(1.03)", transition:"transform 0.2s ease-in-out"}}
        cursor={'pointer'}>
        <Link to='/artists/kygo'> 
            <Image src='/assets/photos/Kygo.webp' borderTopRadius={'10'}>

            </Image>
            <ArtistNameBar text='Kygo'/>
        </Link>
        

        
    </Flex>
  )
}

