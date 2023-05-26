import React, { useEffect, useState } from 'react'
import { PageContainer } from '../components/shared/containers/PageContainer'
import { PerformerInfo } from '../components/pages/Performer/PerformerInfo'
import { Flex, Grid, Text, useBreakpointValue } from '@chakra-ui/react'
import { SimilarPerformers } from '../components/pages/Performer/SimilarPerformers'
import { PerformerEvents } from '../components/pages/Performer/PerformerEvents'
import api from '../api/api'
import { useNavigate, useParams } from 'react-router-dom'

export const Performer = () => {
  const isWideScreen = useBreakpointValue({ base: false, lg: true });
  let {name} = useParams();
  const [artist, setArtist] = useState<any>(null)
  const navigate = useNavigate()
  useEffect(() => {
    const getArtist = async () => {
      try {
        setArtist(await api.getArtistByName(name!))
        
      } catch(error)
      {
        console.log(error)
        navigate("*")
      }
      
    } 

    getArtist()
   }, []
  )

  if(artist)
  {
  return (
    <PageContainer isCentered>
      <Grid>
        <Flex justify={'space-between'}>
          <PerformerInfo name={artist[0].name} url={artist[0].url} description={artist[0].description}/>

          {isWideScreen && ( <SimilarPerformers performertype_id={artist[0].performertype_id}/>)}
          
        
        </Flex>
        <PerformerEvents/>
      </Grid>   
    </PageContainer>
      


  )
  }
  else
  return(
    <Text>Loading</Text>
  )
}


