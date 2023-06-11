import { Flex, useToast } from "@chakra-ui/react"
import { useEffect,useState } from 'react'
import { PacmanPageLoader } from "../../../shared/Loaders/PacmanPageLoader"
import { SpotItem } from "./SpotsItem"
import { SpotCreateUpdatePanel } from "./SpotCreateUpdatePanel"
import api from "../../../../api/api"
import { ArtistsTypePanel } from "../ArtistType/ArtistsTypePanel"
import { SpotsTypePanel } from "../SpotType/SpotTypePanel"

export const SpotsPanel = () => {
    const [spots, setSpots] = useState<any>([])
    const [spotToUpdate, setSpotToUpdate] = useState<any>()
    const [spotsTypes, setSpotsTypes] = useState([])
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const errorToast = (message: string) => {
        toast({
            title: message,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top"
        });
    }

    const getSpots = async () => {
        setLoading(true)
        const res = await api.getSpots();
        if (res.status === 200) 
        {
            console.log(res.data);
            setSpots(res.data);
            setLoading(false);
        } 
        else 
        {
            setLoading(false);
            errorToast("Something went wrong...")
        }
    }

    const getSpotsTypes = async () => {
        const res = await api.getSpotTypes();
        if (res.status === 200) 
        {
            console.log(res.data);
            setSpotsTypes(res.data);

        } 
        else 
        {
            errorToast("Something went wrong...")
        }
    }
    useEffect(() => {
        getSpots()
        getSpotsTypes()
    }, [])

    const handleDelete = async (id: number) => {
        try
        {
            const res = await api.deleteSpot(id)
            setSpots(spots.filter((spot: any) => spot.spot_id !== id))
        }
        catch(e: any)
        {
            errorToast(e.response.data.message)
        }
    }

    const handleSubmit = async (spot: any, address: any) => {
        try
        {

            const res = await api.createAddress(address)
            console.log(res)
            if(res.status === 200)
            {
                
                spot.address_id = res.data.address_id
                console.log(spot)
                const resSpot = await api.createSpot(spot)
                console.log(resSpot)
                if(resSpot.status === 201)
                {
                    setSpots((previousData: any) => [resSpot.data, ...previousData])
                }
            }
            
        }
        catch(e: any)
        {
            console.log(e)
            errorToast(e.response.data.message)
        }
    }

    const handleSubmitUpdate = async (name:string, type: number, description: string, url: string, capacity: number, isOpen: boolean, id: number,
        country: string, city: string, street: string, number: string, address_id: number) => {
        const address = {
            country: country,
            city: city,
            street: street,
            number: number
        }
        const spot = {
            name: name,
            spottype_id: type,
            description: description,
            spotimage: url,
            capacity: capacity,
            isopen: isOpen,
            address_id: address_id
        }
        
        try
        {
            const res = await api.updateAddress(address, address_id)
            if(res.status === 200)
            {
                spot.address_id = res.data.address_id
                const resSpot = await api.updateSpot(spot, id)
                if(resSpot.status === 200)
                {
                    setSpots((previousData: any) => [resSpot.data, ...previousData.filter((spot: any) => spot.spot_id !== id)])
                }
            }
            
        }
        catch(e: any)
        {
            console.log(e)
            errorToast(e.response.data.message)
        }

    }

    const handleSelect = async (spot: any) => {
        setSpotToUpdate(spot)
    }

  return (
    <Flex padding={2}  height={'min-content'}>
        {loading && <PacmanPageLoader/>}
        {!loading && (
            <Flex >
                <Flex w="30%" flexDir="column" gap="16px">
                    {spots.map((spot: any) => (
                    <SpotItem key={spot.spot_id} spot={spot}  handleDelete={handleDelete} handleSelect={handleSelect}></SpotItem>
                    ))}
                </Flex>
                    <SpotCreateUpdatePanel types={spotsTypes} handleSubmitUpdate={handleSubmitUpdate} 
                    handleSubmit={handleSubmit} spotToUpdate={spotToUpdate}></SpotCreateUpdatePanel>
                    
                    <SpotsTypePanel/>
            </Flex>)
        }
    </Flex>
    
  )
}


