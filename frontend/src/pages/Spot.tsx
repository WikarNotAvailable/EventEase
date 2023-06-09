import { useEffect, useState } from 'react'
import { PageContainer } from '../components/shared/containers/PageContainer'
import { Flex, Grid, useToast } from '@chakra-ui/react'
import api from '../api/api'
import { useNavigate, useParams } from 'react-router-dom'
import { PacmanPageLoader } from '../components/shared/Loaders/PacmanPageLoader'
import { SpotEvents } from '../components/pages/Spot/SpotEvents'
import { SpotInfo } from '../components/pages/Spot/SpotInfo'

export const Spot = () => {

  let {name} = useParams();
  const [spot, setSpot] = useState<any>()
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

  const getSpot = async () => {
    try {
      setIsLoading(true)
      const res = await api.getSpotByName(name!)
      if(res.status === 200)
      {
        setIsLoading(false)
        setSpot(res.data)
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
    getSpot()
    console.log(spot)
   }, []
  )


    return (
      
      <PageContainer isCentered>
        {isLoading && <PacmanPageLoader/>}
        {!isLoading && (<Grid>
          <Flex justify={'space-between'}>
            <SpotInfo name={spot[0].name} url={spot[0].spotimage} description={spot[0].description}/>

          </Flex>
          <SpotEvents spot_id={spot[0].spot_id}/>
        </Grid>   )}
      </PageContainer>
        


    )
  
  
}


