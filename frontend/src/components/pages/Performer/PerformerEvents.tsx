import { Flex, Grid, Text, Link, useBreakpointValue, useToast } from '@chakra-ui/react'
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

  const getArtistEvents = async () => {
    try {
      setIsLoading(true)
      const res = await api.getArtistEvents(artist_id)
      if(res.status === 200)
      {
        setIsLoading(false)
        setArtistEvents(res.data)
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
    getArtistEvents()
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
        </Flex>
  
        {artistEvents?.map((event:any) => (
          <PerformerEventsItem key={event.event_id} name={event.name} city={event.spot.address.city} id={event.event_id}
          start_date={new Date(event.begindate).toLocaleDateString()} end_date={new Date(event.enddate).toLocaleDateString()}/>
        ))}
  
      </Grid>
    )
  }
  
}



