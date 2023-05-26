import { Grid, Text } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { SimilarPerformersItem } from './SimilarPerformersItem'
import api from '../../../api/api'

interface ISimilarPerformersProps
{
    performertype_id:number
}

export const SimilarPerformers: FC<ISimilarPerformersProps> = ({performertype_id}) => {

  const [similiarArtists, setSimiliarArtists] = useState<any>([])

  useEffect(() => {
      const getArtistsByType = async () => {
      try {
        setSimiliarArtists(await api.getArtistsByType(performertype_id))
        
      } catch(error)
      {
        console.log(error)
      }
      
    } 

    getArtistsByType()
   }, []
  )
  return (
    <Grid  marginLeft={'10'} alignItems={'flex-start'} maxHeight={'900'} flex={'3 1 0 '}>
        <Text fontSize={'25'} 
            textAlign={'center'}
            borderBottomColor="border"
            borderBottomWidth="4px"
            >
            You may also like
        </Text>

        {similiarArtists.map((artist:any) => (
          <SimilarPerformersItem key={artist.performer_id} name={artist.name} url={artist.url}></SimilarPerformersItem>
        ))}


    </Grid>
  )
}

