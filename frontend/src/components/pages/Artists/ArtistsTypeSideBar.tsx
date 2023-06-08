import { Grid, Tab, TabList, Tabs } from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import api from '../../../api/api'
import { Link, useParams } from 'react-router-dom'

interface IArtistsTypeSideBarProps
{
  changeType: any
}

export const ArtistsTypeSideBar : FC<IArtistsTypeSideBarProps> = ({changeType}) => {

    const [artistTypes, setArtistTypes] = useState<any>()
    const [currentIndex, setCurrentIndex] = useState<number>()
    const [isLoading, setLoading] = useState<boolean>(true)
    const {type} = useParams()

    const getArtistsTypes = async () => {
      const res = await api.getArtistTypes();
      if (res.status === 200) 
      {
          console.log(res.data);
          setArtistTypes(res.data);

      } 
      else 
      {
          toast({
              title: "Something went wrong...",
              status: "error",
              duration: 9000,
              isClosable: true,
              position: "top"
          });
      }
  }
    
    useEffect(() => {
        getArtistsTypes()
    }  , []
    )

    useEffect(() => {
      if(artistTypes)
        setCurrentIndex(artistTypes.findIndex((artistType: { type: string | undefined }) => artistType.type === type) + 1)

    }, [artistTypes])

    useEffect(() => {

      if(currentIndex)
      changeType(currentIndex)
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
      defaultIndex={artistTypes?.findIndex((artistType: { type: string | undefined }) => artistType.type === type) + 1}>
        <TabList>
          <Link  to="/artists/all" reloadDocument>
            <Tab onClick={() => changeType(0)}>All artists</Tab>
          </Link>
          {artistTypes?.map((type:any) => (
            <Link key={type.performertype_id} to={`/artists/${type.type}`} reloadDocument>
              <Tab  onClick={() => changeType(type.performertype_id)}>{type.type}</Tab>
            </Link>
            ))}
        </TabList>
        
  
      </Tabs>
    )
  }
}
function toast(arg0: { title: string; status: string; duration: number; isClosable: boolean; position: string }) {
  throw new Error('Function not implemented.')
}

