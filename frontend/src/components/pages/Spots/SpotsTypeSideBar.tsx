import { Grid, Tab, TabList, Tabs } from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import api from '../../../api/api'
import { Link, useParams } from 'react-router-dom'

interface ISpotsTypeSideBarProps
{
  changeType: any
}

export const SpotsTypeSideBar : FC<ISpotsTypeSideBarProps> = ({changeType: onClick}) => {

    const [spotTypes, setSpotTypes] = useState<any>()
    const [currentIndex, setCurrentIndex] = useState<number>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const {type} = useParams()
    
    useEffect(() => {
        const getSpotTypes = async () => {
        try {
            setIsLoading(true)
            setSpotTypes(await api.getSpotTypes())
            
        } catch(error)
        {
            console.log(error)
        }
        
        } 


        getSpotTypes().then(() => {
          
          setIsLoading(false)
        })
    }  , []
    )

    useEffect(() => {
      if(spotTypes)
        setCurrentIndex(spotTypes.findIndex((spotType: { name: string | undefined }) => spotType.name === type) + 1)

    }, [spotTypes])

    useEffect(() => {

      if(currentIndex)
        onClick(currentIndex, spotTypes[currentIndex! - 1]?.type)
    }, [currentIndex])



    if(isLoading )
    {
      return(
        <></>
      )
    }
  else
  {
    return (
      <Tabs marginLeft={"20"} orientation='vertical' width={"10%"}
      defaultIndex={spotTypes?.findIndex((spotType: { name: string | undefined }) => spotType.name === type) + 1}>
        <TabList>
          <Link  to="/spots/all" reloadDocument>
            <Tab onClick={() => onClick(0)}>All spots</Tab>
          </Link>
          {spotTypes?.map((type:any) => (
            <Link key={type.spottype_id} to={`/spots/${type.name}`} reloadDocument>
              <Tab  onClick={() => onClick(type.spottype_id)}>{type.name}</Tab>
            </Link>
            ))}
        </TabList>
        
  
      </Tabs>
    )
  }
}



