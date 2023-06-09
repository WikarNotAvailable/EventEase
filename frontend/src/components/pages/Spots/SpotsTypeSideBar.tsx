import { Tab, TabList, Tabs, useToast } from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import api from '../../../api/api'
import { Link, useParams } from 'react-router-dom'

interface ISpotsTypeSideBarProps
{
  changeType: any
}

export const SpotsTypeSideBar : FC<ISpotsTypeSideBarProps> = ({changeType}) => {

    const [spotTypes, setSpotTypes] = useState<any>()
    const [currentIndex, setCurrentIndex] = useState<number>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const {type} = useParams()
    const toast = useToast();

    const errorToast = () => {
      toast({
        title: 'Something went wrong...',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    };
    
    const getSpotTypes = async () => {
      try {
          setIsLoading(true)
          const res = await api.getSpotTypes()
          if(res.status === 200)
          {
            setIsLoading(false)
            setSpotTypes(res.data)
          }
          else
          {
            console.log(res)
            setIsLoading(false)
            errorToast()
          }
      } catch(error)
      {
          console.log(error)
      }
      
      } 

    useEffect(() => {
        getSpotTypes()
    }  , []
    )

    useEffect(() => {
      if(spotTypes)
        setCurrentIndex(spotTypes.findIndex((spotType: { name: string | undefined }) => spotType.name === type) + 1)

    }, [spotTypes])

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
      defaultIndex={spotTypes?.findIndex((spotType: { name: string | undefined }) => spotType.name === type) + 1}>
        <TabList>
          <Link  to="/spots/all" reloadDocument>
            <Tab onClick={() => changeType(0)}>All spots</Tab>
          </Link>
          {spotTypes?.map((type:any) => (
            <Link key={type.spottype_id} to={`/spots/${type.name}`} reloadDocument>
              <Tab  onClick={() => changeType(type.spottype_id)}>{type.name}</Tab>
            </Link>
            ))}
        </TabList>
        
  
      </Tabs>
    )
  }
}




