import { Grid, Text } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { SimilarPerformersItem } from './SimilarPerformersItem'
import api from '../../../api/api'

interface ISimilarPerformersProps
{
    performertype_id:number
}

export const SimilarPerformers: FC<ISimilarPerformersProps> = ({performertype_id}) => {

  const [similarArtists, setSimilarArtists] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
      const getArtistsByType = async () => {
      try {
        setIsLoading(true)
        setSimilarArtists(await api.getArtistsByType(performertype_id))
        
      } catch(error)
      {
        console.log(error)
      }
      
    } 

    getArtistsByType().then(() => setIsLoading(false))
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

        {similarArtists.map((artist:any) => (
          <SimilarPerformersItem key={artist.performer_id} name={artist.name} url={artist.url}></SimilarPerformersItem>
        ))}


    </Grid>
  )
}

