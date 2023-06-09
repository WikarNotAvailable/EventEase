import { Grid, Text, useToast } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { SimilarPerformersItem } from './SimilarPerformersItem'
import api from '../../../api/api'

interface ISimilarPerformersProps
{
    performertype_id:number,
    performer_name:string
}

export const SimilarPerformers: FC<ISimilarPerformersProps> = ({performertype_id, performer_name}) => {

  const [similarArtists, setSimilarArtists] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const toast = useToast();

  const errorToast = () => {
		toast({
			title: 'Something went wrong...',
			status: 'error',
			duration: 9000,
			isClosable: true,
			position: 'top',
		});
	};
  
  const getArtistsByType = async () => {
    try {
      setIsLoading(true)
      const res = await api.getArtistsByType(performertype_id, 6)
      if(res.status === 200)
      {
        setIsLoading(false)
        setSimilarArtists(res.data)
      }
      else
      {
        setIsLoading(false)
        errorToast()
      }
    } catch(error)
    {
      console.log(error)
    }
    
  } 
  useEffect(() => {    
    getArtistsByType()
   }, []
  )

  if(isLoading)
  {
    return <></>
  }
  else
  {
    return (
      
      <Grid  marginLeft={'10'} alignItems={'flex-start'} maxHeight={'900'} flex={'3 1 0 '}>
          <Text fontSize={'25'} 
              textAlign={'center'}
              borderBottomColor="border"
              borderBottomWidth="4px"
              >
              You may also like
          </Text>

          {similarArtists.filter((a: any) => a.name !== performer_name).map((artist:any) => (
            <SimilarPerformersItem key={artist.performer_id} name={artist.name} url={artist.url}></SimilarPerformersItem>
          ))}


      </Grid>
    )
  }
}


