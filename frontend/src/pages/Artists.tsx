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
            setArtists(await api.getArtists())
        } catch(error)
        {
          console.log(error)
          navigate("")
        }
        
       
      }
      getArtists().then(() => setIsLoading(false))
    


    
   }, []
  )

  const getArtistsByType = async (type_id:number) => {

    try {
      if(type_id !== 0)
      {      
        setArtists(await api.getArtistsByType(type_id))

      }
      else
      {
        setArtists(await api.getArtists())

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
