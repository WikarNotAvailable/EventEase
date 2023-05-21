import { Flex, Grid, Text, Link, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import { PerformerEventsItem } from './PerformerEventsItem'


export const PerformerEvents = () => {
  const isWideScreen = useBreakpointValue({ base: false, lg: true });
  return (
    <Grid width ={isWideScreen ? "70%" : "100%"}>
      <Flex marginTop={'10'} alignItems={'flex-end'}>
        <Text fontSize={'31'} >
          Upcoming events
        </Text>
        <Link marginLeft={'3'} fontSize={'15'} paddingBottom={'1.5'}>
        see all
        </Link>
      </Flex>
      
      <PerformerEventsItem/>
      <PerformerEventsItem/>
      <PerformerEventsItem/>
      <PerformerEventsItem/>
      <PerformerEventsItem/>
      <PerformerEventsItem/>
      <PerformerEventsItem/>
    </Grid>
  )
}


