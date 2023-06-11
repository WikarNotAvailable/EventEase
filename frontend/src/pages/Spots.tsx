import { useEffect, useState } from 'react'
import { PageContainer } from '../components/shared/containers/PageContainer'
import { Flex, Grid, useToast } from '@chakra-ui/react'
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

 
  useEffect(() => {
    const getSpots = async () => {
      try {
        setIsLoading(true)
        if(type === "all")
          setSpots((await api.getSpots()).data)
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
    console.log(type_id)
    try {

      if(type_id !== 0)
      {      
        const res = await api.getSpotsByType(type_id)
        if(res.status === 200)
        {

          setSpots(res.data)
        }
        else
        {
          console.log(res)

          errorToast()
        }
      }
      else
      {
        const res = await api.getSpots()
        if(res.status === 200)
        {
          console.log(res)
          setSpots(res.data)
        }
        else
        {
          errorToast()
        }

      }

      
    }catch(error)
    {
      console.log(error)
    }

  } 

    return (
      <PageContainer isCentered>
        {isLoading && <PacmanPageLoader/>}
        {!isLoading && (<Flex>
          <Grid templateColumns={'repeat(auto-fill, minmax(300px, 1fr))'} gap={'5'}>
              {spots.map((spot: any) => (
                <SpotItem key={spot.spot_id} name={spot.name} imageUrl={spot.spotimage}/>
              ))}

          </Grid>
          <SpotsTypeSideBar changeType={getSpotsByType} />
        </Flex>)
  }
          
        
      </PageContainer>
    )
  }



