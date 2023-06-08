import { Flex, useToast } from "@chakra-ui/react"
import { useEffect,useState } from 'react'
import api from "../../../api/api"
import { PacmanPageLoader } from "../../shared/Loaders/PacmanPageLoader"
import { ArtistItem } from "./ArtistItem"
import { ArtistCreateUpdatePanel } from "./ArtistCreateUpdatePanel"

export const ArtistsPanel = () => {
    const [artists, setArtists] = useState<any>([])
    const [artistToUpdate, setArtistToUpdate] = useState<any>()
    const [artistsTypes, setArtistsTypes] = useState([])
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const getArtists = async () => {
        setLoading(true)
        const res = await api.getArtists();
        if (res.status === 200) 
        {
            console.log(res.data);
            setArtists(res.data);
            setLoading(false);
        } 
        else 
        {
            setLoading(false);
            toast({
                title: "Something went wrong...",
                status: "error",
                duration: 9000,
                isClosable: true,
                position: "top"
            });
        }
    }

    const getArtistsTypes = async () => {
        const res = await api.getArtistTypes();
        if (res.status === 200) 
        {
            console.log(res.data);
            setArtistsTypes(res.data);

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
        getArtists()
        getArtistsTypes()
    }, [])

    const handleDelete = async (id: number) => {
        await api.deleteArtist(id).then((res: any) => {
            console.log(res);
            setArtists(artists.filter((artist: any) => artist.performer_id !== id))
        })
    }

    const handleSubmit = async (artist: any) => {
        console.log(artist);
        await api.createArtist(artist).then((res: any) => {
            console.log(res);
            setArtists((previousData: any) => [res.data, ...previousData])
        })
    }

    const handleSubmitUpdate = async (name:string, type: number, description: string, url: string, id: number) => {
        const artist = {
            name: name,
            performertype_id: type,
            description: description,
            url: url
        }
        console.log(artist)
        console.log(id)
        await api.updateArtist(artist, id).then((res: any) => {
            console.log(res);
            //setArtists((previousData: any) => [res.data, ...previousData])
        })
    }

    const handleSelect = async (artist: any) => {
        setArtistToUpdate(artist)
        console.log(artist)
    }

  return (
    <Flex>
        {loading && <PacmanPageLoader/>}
        {!loading && (
            <Flex>
                <Flex w="50%" flexDir="column" gap="16px">
                    {artists.map((artist: any) => (
                    <ArtistItem key={artist.performer_id} artist={artist}  handleDelete={handleDelete} handleSelect={handleSelect}></ArtistItem>
                    ))}
                </Flex>
                    <ArtistCreateUpdatePanel types={artistsTypes} handleSubmitUpdate={handleSubmitUpdate} 
                    handleSubmit={handleSubmit} artistToUpdate={artistToUpdate}></ArtistCreateUpdatePanel>
                    
            </Flex>)
        }
    </Flex>
    
  )
}


