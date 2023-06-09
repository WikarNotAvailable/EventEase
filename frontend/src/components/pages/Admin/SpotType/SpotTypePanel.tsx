import { Flex, useToast } from "@chakra-ui/react"
import { useEffect,useState } from 'react'
import { PacmanPageLoader } from "../../../shared/Loaders/PacmanPageLoader"
import api from "../../../../api/api"
import { SpotTypeItem } from "./SpotTypeItem"
import { SpotTypeCreateUpdatePanel } from "./SpotTypeCreateUpdatePanel"


export const SpotsTypePanel = () => {
    const [spotTypeToUpdate, setSpotTypeToUpdate] = useState<any>()
    const [spotsTypes, setSpotsTypes] = useState<any>([])
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

    const getSpotsTypes = async () => {
        setLoading(true)
        const res = await api.getSpotTypes();
        if (res.status === 200) 
        {
            setSpotsTypes(res.data);
            setLoading(false);
        } 
        else 
        {
            setLoading(false);
            errorToast("Something went wrong...")
        }
    }

    useEffect(() => {
        getSpotsTypes()
    }, [])

    const handleDelete = async (id: number) => {
        try
        {
            const res = await api.deleteSpotType(id)
            setSpotsTypes(spotsTypes.filter((type: any) => type.spottype_id !== id))
        }
        catch(e: any)
        {
            errorToast(e.response.data.message)
        }
    }

    const handleSubmit = async (type: any) => {
        console.log(type);
        
        try
        {
            const res = await api.createSpotType(type)
            setSpotsTypes((previousData: any) => [res.data, ...previousData])
        }
        catch(e: any)
        {
            console.log(e)
            errorToast(e.response.data.message)
        }
            
        
    }

    const handleSubmitUpdate = async (name:string, id: number) => {
        const spot = {
            spotTypeName: name,     
        }
     
        try
        {
            const res = await api.updateSpotType(spot, id)
            setSpotsTypes((previousData: any) => [res.data, ...previousData.filter((artist: any) => artist.spottype_id !== id)])
        }
        catch(e: any)
        {
            errorToast(e.response.data.message)
        }
            
        
    }

    const handleSelect = async (artist: any) => {
        setSpotTypeToUpdate(artist)
    }

  return (
    <Flex borderColor="border" borderWidth={2} padding={2} borderRadius={5} height={'min-content'}>
        {loading && <PacmanPageLoader/>}
        {!loading && (
            <Flex>
                <Flex w="50%" flexDir="column" gap="16px">
                    {spotsTypes.map((type: any) => (
                    <SpotTypeItem key={type.spottype_id} type={type}  handleDelete={handleDelete} handleSelect={handleSelect}></SpotTypeItem>
                    ))}
                </Flex>
                    <SpotTypeCreateUpdatePanel  handleSubmitUpdate={handleSubmitUpdate} 
                    handleSubmit={handleSubmit} typeToUpdate={spotTypeToUpdate}></SpotTypeCreateUpdatePanel>
                    
            </Flex>)
        }
    </Flex>
    
  )
}


