import { useEffect, useState } from 'react'
import { PageContainer } from '../components/shared/containers/PageContainer'
import { Flex, Grid } from '@chakra-ui/react'
import { ArtistItem } from '../components/pages/Artists/ArtistItem'
import api from '../api/api'
import { PacmanLoader } from 'react-spinners'
import { PacmanPageLoader } from '../components/shared/Loaders/PacmanPageLoader'
import { ArtistsTypeSideBar } from '../components/pages/Artists/ArtistsTypeSideBar'

export const Artists = () => {
  const [artists, setArtists] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const getArtists = async () => {
      try {
        setIsLoading(true)
        setArtists(await api.getArtists())
      } catch(error)
      {
        console.log(error)
      }
      
    } 

    getArtists().then(() => setIsLoading(false))
    
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
        <Flex>
          <Grid templateColumns={'repeat(auto-fill, minmax(300px, 1fr))'} gap={'5'}>
              {artists.map((artist: any) => (
                <ArtistItem key={artist.performer_id} name={artist.name} imageUrl={artist.url}/>
              ))}

          </Grid>
          <ArtistsTypeSideBar/>
        </Flex>
          
        
      </PageContainer>
    )
  }
}
