import { Tabs, TabList, TabPanel, TabPanels, Tab, Button } from '@chakra-ui/react'
import React, {FC} from 'react'
import { ArtistCreate } from './ArtistCreate'
import { ArtistUpdate } from './ArtistUpdate'


interface IArtistCreateUpdatePanelProps
{
    types: any,
    handleSubmit: any,
    handleSubmitUpdate: any,
    artistToUpdate: any,
}

export const ArtistCreateUpdatePanel :FC<IArtistCreateUpdatePanelProps> = ({types, handleSubmit, handleSubmitUpdate, artistToUpdate}) => {

  return (
    <Tabs margin={4} height={'min-content'}>
        <TabList>
            <Tab>Add new artist</Tab>
            <Tab>Update artist</Tab>
        </TabList>
        <TabPanels>
            <TabPanel>
                <ArtistCreate types={types} handleSubmit={handleSubmit}></ArtistCreate>
            </TabPanel>
            <TabPanel>
              <ArtistUpdate types={types} handleSubmitUpdate={handleSubmitUpdate} artistToUpdate={artistToUpdate} ></ArtistUpdate>
            </TabPanel>
        </TabPanels>
    </Tabs>

    
  )
}

