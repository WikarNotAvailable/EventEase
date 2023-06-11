import React from 'react'
import { PageContainer } from '../components/shared/containers/PageContainer'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { ArtistsPanel } from '../components/pages/Admin/Artist/ArtistsPanel'
import { SpotsPanel } from '../components/pages/Admin/Spot/SpotsPanel'

export const AdminPanel = () => {
  return (
    <PageContainer>
      <Tabs>
        <TabList>

            <Tab>Artists</Tab>
            <Tab>Spots</Tab>

        </TabList>
        <TabPanels>
            <TabPanel>
            <ArtistsPanel></ArtistsPanel>
            </TabPanel>
            <TabPanel>
            <SpotsPanel></SpotsPanel>
            </TabPanel>
        </TabPanels>
      </Tabs>
    </PageContainer>
  )
}

