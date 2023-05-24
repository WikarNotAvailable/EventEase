import React from 'react'
import { PageContainer } from '../components/shared/containers/PageContainer'
import { Grid } from '@chakra-ui/react'
import { ProfilePhoto } from '../components/pages/MyProfile/ProfilePhoto'
import { ProfileData } from '../components/pages/MyProfile/ProfileData'


export const MyProfile = () => {
  return (
    <PageContainer isCentered>


            <ProfilePhoto/>
            <ProfileData/>
            

        


    </PageContainer>
    )
}    