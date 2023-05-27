import { Grid, Tab, TabList, Tabs } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import api from '../../../api/api'

export const ArtistsTypeSideBar = () => {

    const [artistTypes, setArtistTypes] = useState<any>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const getArtistTypes = async () => {
        try {
            setIsLoading(true)
            setArtistTypes(await api.getArtistTypes())
            
        } catch(error)
        {
            console.log(error)
        }
        
        } 

        getArtistTypes().then(() => setIsLoading(false))
    }  , []
    )

    const tabChange = () => {
        
    }

    if(isLoading)
  {
    return(
      <></>
    )
  }
  else
  {
    return (
      <Tabs marginLeft={"20"} orientation='vertical' onChange={tabChange} index={1}>
        <TabList>
            {artistTypes.map((type:any) => (
                <Tab key={type.performertype_id} >{type.type}</Tab>
            ))}
        </TabList>
        
  
      </Tabs>
    )
  }
}
