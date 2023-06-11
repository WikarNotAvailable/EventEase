import { Tabs, TabList, TabPanel, TabPanels, Tab } from '@chakra-ui/react'
import {FC} from 'react'
import {  ArtistTypeCreate } from './ArtistTypeCreate'
import { ArtistTypeUpdate } from './ArtistTypeUpdate'


interface IArtistTypeCreateUpdatePanelProps
{
    handleSubmit: any,
    handleSubmitUpdate: any,
    typeToUpdate: any,
}

export const ArtistTypeCreateUpdatePanel :FC<IArtistTypeCreateUpdatePanelProps> = ({handleSubmit, handleSubmitUpdate, typeToUpdate}) => {

  return (
    <Tabs margin={4} height={'min-content'}>
        <TabList>
            <Tab>Add new artist type</Tab>
            <Tab>Update artist type</Tab>
        </TabList>
        <TabPanels>
            <TabPanel>
                <ArtistTypeCreate handleSubmit={handleSubmit}></ArtistTypeCreate>
            </TabPanel>
            <TabPanel>
              <ArtistTypeUpdate  handleSubmitUpdate={handleSubmitUpdate} typeToUpdate={typeToUpdate} ></ArtistTypeUpdate>
            </TabPanel>
        </TabPanels>
    </Tabs>

    
  )
}

