import { useEffect, useState } from 'react'
import { PageContainer } from '../components/shared/containers/PageContainer'
import { Flex, Grid } from '@chakra-ui/react'
import { ArtistItem } from '../components/pages/Artists/ArtistItem'
import api from '../api/api'
import { PacmanPageLoader } from '../components/shared/Loaders/PacmanPageLoader'
import { ArtistsTypeSideBar } from '../components/pages/Artists/ArtistsTypeSideBar'
import { useNavigate, useParams } from 'react-router-dom'

export const Artists = () => {
  const [artists, setArtists] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const navigate = useNavigate()
  const {type} = useParams()
 
  useEffect(() => {

      const getArtists = async () => {
        try {
          setIsLoading(true)
          if(type === "all")
            setArtists((await api.getArtists()).data)
        } catch(error)
        {
          console.log(error)
          navigate("")
        }
        
       
      }
      getArtists().then(() => setIsLoading(false))
    
   }, []
  )

  const errorToast = () => {
		toast({
			title: 'Something went wrong...',
			status: 'error',
			duration: 9000,
			isClosable: true,
			position: 'top',
		});
	};

  const getArtistsByType = async (type_id:number) => {

    try {
      if(type_id !== 0)
      { 
        const res = await api.getArtistsByType(type_id, 100)  
        if(res.status === 200)
        {
          setArtists(res.data)
        }
        else
        {
          errorToast()
        }
        

      }
      else
      {
        const res = await api.getArtists()  
        if(res.status === 200)
        {
          setArtists(res.data)
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
              {artists.map((artist: any) => (
                <ArtistItem key={artist.performer_id} name={artist.name} imageUrl={artist.url}/>
              ))}

          </Grid>
          <ArtistsTypeSideBar changeType={getArtistsByType}/>
        </Flex>
          
        
      </PageContainer>
    )
  }
}
function toast(arg0: { title: string; status: string; duration: number; isClosable: boolean; position: string }) {
  throw new Error('Function not implemented.')
}

