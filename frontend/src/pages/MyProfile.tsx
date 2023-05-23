import React from 'react'
import { PageContainer } from '../components/shared/containers/PageContainer'
import { Grid } from '@chakra-ui/react'
import { ProfilePhoto } from '../components/pages/MyProfile/ProfilePhoto'
import { ProfileData } from '../components/pages/MyProfile/ProfileData'


export const MyProfile = () => {
  return (
    <PageContainer isCentered>

      <Grid templateColumns={'repeat(auto-fill, minmax(200px, 1fr))'} >
            <ProfilePhoto/>
            
            
      </Grid>
        


    </PageContainer>
    )
}    