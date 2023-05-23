import { useEffect, useState } from 'react'
import { PageContainer } from '../components/shared/containers/PageContainer'
import { Grid } from '@chakra-ui/react'
import { ArtistItem } from '../components/pages/Artists/ArtistItem'
import api from '../api/api'

export const Artists = () => {

  const [artists, setArtists] = useState([])
  useEffect(() => {
    const getArtists = async () => {
      try {
        setArtists(await api.getArtists())
      } catch(error)
      {
        console.log(error)
      }
      
    } 

    getArtists()
   }
  )
  
  return (
    <PageContainer isCentered>
        <Grid templateColumns={'repeat(auto-fill, minmax(300px, 1fr))'} gap={'5'}>
          {artists.map((artist: any) => (
            <ArtistItem key={artist.performer_id} name={artist.name} imageUrl={artist.url}/>
          ))}

        </Grid>
      
    </PageContainer>
  )
}
