import { Flex, useToast } from "@chakra-ui/react"
import { useEffect,useState } from 'react'
import { PacmanPageLoader } from "../../../shared/Loaders/PacmanPageLoader"
import { ArtistTypeCreateUpdatePanel } from "./ArtistTypeCreateUpdatePanel"
import api from "../../../../api/api"
import { ArtistTypeItem } from "./ArtistTypeItem"

export const ArtistsTypePanel = () => {
    const [artistTypeToUpdate, setArtistTypeToUpdate] = useState<any>()
    const [artistsTypes, setArtistsTypes] = useState<any>([])
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

    const getArtistsTypes = async () => {
        setLoading(true)
        const res = await api.getArtistTypes();
        if (res.status === 200) 
        {
            setArtistsTypes(res.data);
            setLoading(false);
        } 
        else 
        {
            setLoading(false);
            errorToast("Something went wrong...")
        }
    }

    useEffect(() => {
        getArtistsTypes()
    }, [])

    const handleDelete = async (id: number) => {
        try
        {
            const res = await api.deleteArtistType(id)
            setArtistsTypes(artistsTypes.filter((type: any) => type.performertype_id !== id))
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
            const res = await api.createArtistType(type)
            setArtistsTypes((previousData: any) => [res.data, ...previousData])
        }
        catch(e: any)
        {
            console.log(e)
            errorToast(e.response.data.message)
        }
            
        
    }

    const handleSubmitUpdate = async (name:string, id: number) => {
        const artist = {
            performerTypeName: name,     
        }
     
        try
        {
            const res = await api.updateArtistType(artist, id)
            setArtistsTypes((previousData: any) => [res.data, ...previousData.filter((artist: any) => artist.performertype_id !== id)])
        }
        catch(e: any)
        {
            errorToast(e.response.data.message)
        }
            
        
    }

    const handleSelect = async (artist: any) => {
        setArtistTypeToUpdate(artist)
    }

  return (
    <Flex borderColor="border" borderWidth={2} padding={2} borderRadius={5} height={'min-content'}>
        {loading && <PacmanPageLoader/>}
        {!loading && (
            <Flex>
                <Flex w="50%" flexDir="column" gap="16px">
                    {artistsTypes.map((type: any) => (
                    <ArtistTypeItem key={type.performertype_id} type={type}  handleDelete={handleDelete} handleSelect={handleSelect}></ArtistTypeItem>
                    ))}
                </Flex>
                    <ArtistTypeCreateUpdatePanel  handleSubmitUpdate={handleSubmitUpdate} 
                    handleSubmit={handleSubmit} typeToUpdate={artistTypeToUpdate}></ArtistTypeCreateUpdatePanel>
                    
            </Flex>)
        }
    </Flex>
    
  )
}


