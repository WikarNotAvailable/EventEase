import { Flex, Grid, Text, Link, useBreakpointValue } from '@chakra-ui/react'
import { PerformerEventsItem } from './PerformerEventsItem'
import { FC, useEffect, useState } from 'react';
import api from '../../../api/api';

interface IPerformerEventsProps{
  artist_id:number
}

export const PerformerEvents : FC<IPerformerEventsProps> = ({artist_id}) => {
  const isWideScreen = useBreakpointValue({ base: false, lg: true });
  const [artistEvents, setArtistEvents] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const getArtistEvents = async () => {
      try {
        setIsLoading(true)
        setArtistEvents(await api.getArtistEvents(artist_id))
        
      } catch(error)
      {
        console.log(error)
      }
    
    } 

    getArtistEvents().then(() => setIsLoading(false))
  }  , []
  )

  if(isLoading)
  {
    return(
      <></>
    )
  }
  else
  {
    return (
      <Grid width ={isWideScreen ? "70%" : "100%"}>
        <Flex marginTop={'10'} align={'end'} textColor={"#101828"}>
          <Text fontSize={'31'} >
            Upcoming events
          </Text>
          <Link textColor={"#101828"} marginLeft={'3'} fontSize={'15'} paddingBottom={'1.5'}>
          see all
          </Link>
        </Flex>
  
        {artistEvents?.map((event:any) => (
          <PerformerEventsItem key={event.event_id} name={event.name} city={event.spot.address.city} 
          start_date={new Date(event.begindate).toLocaleDateString()} end_date={new Date(event.enddate).toLocaleDateString()}/>
        ))}
  
      </Grid>
    )
  }
  
}


