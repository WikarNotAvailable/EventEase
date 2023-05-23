import React, { useEffect, useState } from 'react'
import { PageContainer } from '../components/shared/containers/PageContainer'
import { PerformerInfo } from '../components/pages/Performer/PerformerInfo'
import { Flex, Grid, useBreakpointValue } from '@chakra-ui/react'
import { SimilarPerformers } from '../components/pages/Performer/SimilarPerformers'
import { PerformerEvents } from '../components/pages/Performer/PerformerEvents'
import api from '../api/api'
import { useParams } from 'react-router-dom'

export const Performer = () => {
  const isWideScreen = useBreakpointValue({ base: false, lg: true });
  const {artistName} = useParams();
  const [artist, setArtist] = useState<any>([])
  useEffect(() => {
    const getArtist = async () => {
      try {
        setArtist(await api.getArtistByName(artistName!))
      } catch(error)
      {
        console.log(error)
      }
      
    } 

    getArtist()
   }
  )
  return (
    <PageContainer isCentered>
      <Grid>
        <Flex justify={'space-between'}>
          <PerformerInfo name={artist.name} url={artist.url} description={artist.description}/>

          {isWideScreen && ( <SimilarPerformers/>)}
          
        
        </Flex>
        <PerformerEvents/>
      </Grid>   
    </PageContainer>
      


  )
}


