import { useEffect, useState } from 'react'
import { PageContainer } from '../components/shared/containers/PageContainer'
import { PerformerInfo } from '../components/pages/Performer/PerformerInfo'
import { Flex, Grid, useBreakpointValue, useToast } from '@chakra-ui/react'
import { SimilarPerformers } from '../components/pages/Performer/SimilarPerformers'
import { PerformerEvents } from '../components/pages/Performer/PerformerEvents'
import api from '../api/api'
import { useNavigate, useParams } from 'react-router-dom'
import { PacmanPageLoader } from '../components/shared/Loaders/PacmanPageLoader'

export const Performer = () => {
  const isWideScreen = useBreakpointValue({ base: false, lg: true });
  let {name} = useParams();
  const [artist, setArtist] = useState<any>(null)
  const navigate = useNavigate()
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

  const getArtist = async () => {
    try {
      setIsLoading(true)
      const res = await api.getArtistByName(name!)
      if(res.status === 200)
      {
        setIsLoading(false)
        setArtist(res.data)
      }
      else
      {
        setIsLoading(false)
        errorToast()
      }
    } catch(error)
    {
      console.log(error)
      navigate("")
    }
    
  } 
  useEffect(() => {
    getArtist()
    console.log(artist)
   }, []
  )

  if(isLoading)
  {
    return(
      <PacmanPageLoader/>
    )
  }
  else
  {
    return (
      <PageContainer isCentered>
        <Grid>
          <Flex justify={'space-between'}>
            <PerformerInfo name={artist[0].name} url={artist[0].url} description={artist[0].description}/>

            {isWideScreen && ( <SimilarPerformers performertype_id={artist[0].performertype_id} performer_name={artist[0].name}/>)}
            
          
          </Flex>
          <PerformerEvents artist_id={artist[0].performer_id}/>
        </Grid>   
      </PageContainer>
        


    )
  }
  
}



