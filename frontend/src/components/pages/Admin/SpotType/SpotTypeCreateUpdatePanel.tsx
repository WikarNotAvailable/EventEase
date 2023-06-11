import { Tabs, TabList, TabPanel, TabPanels, Tab } from '@chakra-ui/react'
import  {FC} from 'react'
import { SpotTypeCreate } from './SpotTypeCreate'
import { SpotTypeUpdate } from './SpotTypeUpdate'


interface ISpotTypeCreateUpdatePanelProps
{
    handleSubmit: any,
    handleSubmitUpdate: any,
    typeToUpdate: any,
}

export const SpotTypeCreateUpdatePanel :FC<ISpotTypeCreateUpdatePanelProps> = ({handleSubmit, handleSubmitUpdate, typeToUpdate}) => {

  return (
    <Tabs margin={4} height={'min-content'}>
        <TabList>
            <Tab>Add new spot type</Tab>
            <Tab>Update spot type</Tab>
        </TabList>
        <TabPanels>
            <TabPanel>
                <SpotTypeCreate handleSubmit={handleSubmit}></SpotTypeCreate>
            </TabPanel>
            <TabPanel>
              <SpotTypeUpdate  handleSubmitUpdate={handleSubmitUpdate} typeToUpdate={typeToUpdate} ></SpotTypeUpdate>
            </TabPanel>
        </TabPanels>
    </Tabs>

    
  )
}

