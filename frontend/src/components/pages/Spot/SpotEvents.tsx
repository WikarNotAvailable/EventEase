import { Flex, Grid, Text, Link, useBreakpointValue, useToast } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react';
import api from '../../../api/api';
import { SpotEventsItem } from './SpotEventsItem';

interface ISpotEventsProps{
  spot_id:number
}

export const SpotEvents : FC<ISpotEventsProps> = ({spot_id}) => {
  //const isWideScreen = useBreakpointValue({ base: false, lg: true });
  const [spotEvents, setSpotEvents] = useState<any>()
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

  const getSpotEvents = async () => {
    try {
      setIsLoading(true)
      const res = await api.getSpotEvents(spot_id)
      if(res.status === 200)
      {
        setIsLoading(false)
        setSpotEvents(res.data)
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


    getSpotEvents()
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
      <Grid width =/*{isWideScreen ? "70%" : */"100%"/*}*/>
        <Flex marginTop={'10'} align={'end'} textColor={"#101828"}>
          <Text fontSize={'31'} >
            Upcoming events
          </Text>

        </Flex>
  
        {spotEvents?.map((event:any) => (
          <SpotEventsItem key={event.event_id} name={event.name}
            start_date={new Date(event.begindate).toLocaleDateString()} end_date={new Date(event.enddate).toLocaleDateString()} id={event.event_id} />
        ))}
  
      </Grid>
    )
  }
  
}



