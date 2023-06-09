import { Tabs, TabList, TabPanel, TabPanels, Tab, Button } from '@chakra-ui/react'
import React, {FC} from 'react'
import { SpotCreate } from './SpotCreate'
import { SpotUpdate } from './SpotUpdate'


interface ISpotCreateUpdatePanelProps
{
    types: any,
    handleSubmit: any,
    handleSubmitUpdate: any,
    spotToUpdate: any,
}

export const SpotCreateUpdatePanel :FC<ISpotCreateUpdatePanelProps> = ({types, handleSubmit, handleSubmitUpdate, spotToUpdate}) => {

  return (
    <Tabs margin={4} height={'min-content'}>
        <TabList>
            <Tab>Add new spot</Tab>
            <Tab>Update spot</Tab>
        </TabList>
        <TabPanels>
            <TabPanel>
                <SpotCreate types={types} handleSubmit={handleSubmit}></SpotCreate>
            </TabPanel>
            <TabPanel>
              <SpotUpdate types={types} handleSubmitUpdate={handleSubmitUpdate} spotToUpdate={spotToUpdate} ></SpotUpdate>
            </TabPanel>
        </TabPanels>
    </Tabs>

    
  )
}

