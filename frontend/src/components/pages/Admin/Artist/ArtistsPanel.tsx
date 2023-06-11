import { Flex, useToast } from "@chakra-ui/react"
import { useEffect,useState } from 'react'
import { PacmanPageLoader } from "../../../shared/Loaders/PacmanPageLoader"
import { ArtistItem } from "./ArtistItem"
import { ArtistCreateUpdatePanel } from "./ArtistCreateUpdatePanel"
import api from "../../../../api/api"
import { ArtistsTypePanel } from "../ArtistType/ArtistsTypePanel"

export const ArtistsPanel = () => {
    const [artists, setArtists] = useState<any>([])
    const [artistToUpdate, setArtistToUpdate] = useState<any>()
    const [artistsTypes, setArtistsTypes] = useState([])
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

    const getArtists = async () => {
        setLoading(true)
        const res = await api.getArtists();
        if (res.status === 200) 
        {
            setArtists(res.data);
            setLoading(false);
        } 
        else 
        {
            setLoading(false);
            errorToast("Something went wrong...")
        }
    }

    const getArtistsTypes = async () => {
        const res = await api.getArtistTypes();
        if (res.status === 200) 
        {
            setArtistsTypes(res.data);

        } 
        else 
        {
            errorToast("Something went wrong...")
        }
    }
    useEffect(() => {
        getArtists()
        getArtistsTypes()
    }, [])

    const handleDelete = async (id: number) => {
        try
        {
            const res = await api.deleteArtist(id)
            setArtists(artists.filter((artist: any) => artist.performer_id !== id))
        }
        catch(e: any)
        {
            errorToast(e.response.data.message)
        }
    }

    const handleSubmit = async (artist: any) => {
        try
        {
            const res = await api.createArtist(artist)
            setArtists((previousData: any) => [res.data, ...previousData])
        }
        catch(e: any)
        {
            errorToast(e.response.data.message)
        }
    }

    const handleSubmitUpdate = async (name:string, type: number, description: string, url: string, id: number) => {
        const artist = {
            name: name,
            performertype_id: type,
            description: description,
            url: url
        }
        
        try
        {
            const res = await api.updateArtist(artist, id)
            setArtists((previousData: any) => [res.data, ...previousData.filter((artist: any) => artist.performer_id !== id)])
        }
        catch(e: any)
        {
            errorToast(e.response.data.message)
        }

    }

    const handleSelect = async (artist: any) => {
        setArtistToUpdate(artist)
    }

  return (
    <Flex padding={2}  height={'min-content'}>
        {loading && <PacmanPageLoader/>}
        {!loading && (
            <Flex >
                <Flex w="30%" flexDir="column" gap="16px">
                    {artists.map((artist: any) => (
                    <ArtistItem key={artist.performer_id} artist={artist}  handleDelete={handleDelete} handleSelect={handleSelect}></ArtistItem>
                    ))}
                </Flex>
                    <ArtistCreateUpdatePanel types={artistsTypes} handleSubmitUpdate={handleSubmitUpdate} 
                    handleSubmit={handleSubmit} artistToUpdate={artistToUpdate}></ArtistCreateUpdatePanel>
                    
                    <ArtistsTypePanel/>
            </Flex>)
        }
    </Flex>
    
  )
}


