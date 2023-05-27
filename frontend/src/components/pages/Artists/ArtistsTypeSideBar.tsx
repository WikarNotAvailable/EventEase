import { Grid, Tab, TabList, Tabs } from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import api from '../../../api/api'
import { Link, useParams } from 'react-router-dom'

interface IArtiststypeSideBarProps
{
  onClick: any,
  isParentLoading: boolean
}

export const ArtistsTypeSideBar : FC<IArtiststypeSideBarProps> = ({onClick, isParentLoading}) => {

    const [artistTypes, setArtistTypes] = useState<any>()
    const [currentIndex, setCurrentIndex] = useState<number>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const {type} = useParams()
    
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


        getArtistTypes().then(() => {
          
          setIsLoading(false)
        })
    }  , []
    )

    useEffect(() => {
      if(artistTypes)
        setCurrentIndex(artistTypes.findIndex((artistType: { type: string | undefined }) => artistType.type === type) + 1)

    }, [artistTypes])

    useEffect(() => {

      if(currentIndex)
        onClick(currentIndex, artistTypes[currentIndex! - 1]?.type)
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
      defaultIndex={artistTypes.findIndex((artistType: { type: string | undefined }) => artistType.type === type) + 1}>
        <TabList>
          <Link  to="/artists/all" reloadDocument>
            <Tab onClick={() => onClick(0, "all")}>All artists</Tab>
          </Link>
          {artistTypes.map((type:any) => (
            <Link key={type.performertype_id} to={`/artists/${type.type}`} reloadDocument>
              <Tab  onClick={() => onClick(type.performertype_id, type.type)}>{type.type}</Tab>
            </Link>
            ))}
        </TabList>
        
  
      </Tabs>
    )
  }
}
