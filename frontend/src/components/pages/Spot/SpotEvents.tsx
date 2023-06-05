import { Flex, Grid, Text, Link, useBreakpointValue } from '@chakra-ui/react'
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

  useEffect(() => {
    const getSpotEvents = async () => {
      try {
        setIsLoading(true)
        setSpotEvents(await api.getSpotEvents(spot_id))
        
      } catch(error)
      {
        console.log(error)
      }
    
    } 

    getSpotEvents().then(() => setIsLoading(false))
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
          <Link textColor={"#101828"} marginLeft={'3'} fontSize={'15'} paddingBottom={'1.5'}>
          see all
          </Link>
        </Flex>
  
        {spotEvents?.map((event:any) => (
          <SpotEventsItem key={event.event_id} name={event.name}
            start_date={new Date(event.begindate).toLocaleDateString()} end_date={new Date(event.enddate).toLocaleDateString()} />
        ))}
  
      </Grid>
    )
  }
  
}


