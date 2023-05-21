import React from 'react'
import { PageContainer } from '../components/shared/containers/PageContainer'
import { PerformerInfo } from '../components/pages/Performer/PerformerInfo'
import { Flex, Grid, useBreakpointValue } from '@chakra-ui/react'
import { SimilarPerformers } from '../components/pages/Performer/SimilarPerformers'
import { PerformerEvents } from '../components/pages/Performer/PerformerEvents'

export const Performer = () => {
  const isWideScreen = useBreakpointValue({ base: false, lg: true });
  return (
    <PageContainer isCentered>
      <Grid>
        <Flex justify={'space-between'}>
          <PerformerInfo/>

          {isWideScreen && ( <SimilarPerformers/>)}
          
        
        </Flex>
        <PerformerEvents/>
      </Grid>   
    </PageContainer>
      


  )
}


