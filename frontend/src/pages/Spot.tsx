import { useEffect, useState } from 'react'
import { PageContainer } from '../components/shared/containers/PageContainer'
import { Flex, Grid } from '@chakra-ui/react'
import api from '../api/api'
import { useNavigate, useParams } from 'react-router-dom'
import { PacmanPageLoader } from '../components/shared/Loaders/PacmanPageLoader'
import { SpotEvents } from '../components/pages/Spot/SpotEvents'
import { SpotInfo } from '../components/pages/Spot/SpotInfo'

export const Spot = () => {

  let {name} = useParams();
  const [spot, setSpot] = useState<any>(null)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const getSpot = async () => {
      try {
        setIsLoading(true)
        setSpot(await api.getSpotByName(name!))
        
      } catch(error)
      {
        console.log(error)
        navigate("")
      }
      
    } 

    getSpot().then(() => setIsLoading(false))
    console.log(spot)
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
            <SpotInfo name={spot[0].name} url={spot[0].spotimage} description={spot[0].description}/>

          </Flex>
          <SpotEvents spot_id={spot[0].performer_id}/>
        </Grid>   
      </PageContainer>
        


    )
  }
  
}




