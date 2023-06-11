import { useEffect, useState } from 'react'
import { PageContainer } from '../components/shared/containers/PageContainer'
import { Flex, Grid } from '@chakra-ui/react'
import { SpotItem } from '../components/pages/Spots/SpotItem'
import api from '../api/api'
import { PacmanPageLoader } from '../components/shared/Loaders/PacmanPageLoader'
import { SpotsTypeSideBar } from '../components/pages/Spots/SpotsTypeSideBar'
import { useNavigate, useParams } from 'react-router-dom'

export const Spots = () => {
  const [spots, setSpots] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const navigate = useNavigate()
  const {type} = useParams()
 
  useEffect(() => {

      const getSpots = async () => {
        try {
          setIsLoading(true)
          if(type === "all")
            setSpots(await api.getSpots())
        } catch(error)
        {
          console.log(error)
          navigate("")
        }
        
       
      }
      getSpots().then(() => setIsLoading(false))
    


    
   }, []
  )

  const getSpotsByType = async (type_id:number) => {

    try {
      if(type_id !== 0)
      {      
        setSpots(await api.getSpotsByType(type_id))

      }
      else
      {
        setSpots(await api.getSpots())

      }

      
    }catch(error)
    {
      console.log(error)
    }

  } 

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
        <Flex>
          <Grid templateColumns={'repeat(auto-fill, minmax(300px, 1fr))'} gap={'5'}>
              {spots.map((spot: any) => (
                <SpotItem key={spot.spot_id} name={spot.name} imageUrl={spot.spotimage}/>
              ))}

          </Grid>
          <SpotsTypeSideBar changeType={getSpotsByType} />
        </Flex>
          
        
      </PageContainer>
    )
  }
}


