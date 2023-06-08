import React from 'react'
import { PageContainer } from '../components/shared/containers/PageContainer'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { ArtistsPanel } from '../components/pages/Admin/ArtistsPanel'

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
            Spots
            </TabPanel>
        </TabPanels>
      </Tabs>
    </PageContainer>
  )
}

