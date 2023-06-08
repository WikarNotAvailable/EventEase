import { Button, Flex, Input, Select, Textarea, Image, FormControl, FormLabel, Box } from '@chakra-ui/react'
import React, { FC, useRef, useState } from 'react'
import api from '../../../api/api'
import { Form, Formik } from 'formik'

interface IArtistCreateProps
{
    types: any,
    handleSubmit: any
}
export const ArtistCreate :FC<IArtistCreateProps> = ({types, handleSubmit}) => {
    const [artist, setArtist] = useState({
        performertype_id: 0,
        name: '',
        description: '',
        url: ''
    })
    const [selectedImage, setSelectedImage] = useState<any>();
    const hiddenFileInput = useRef<any>();
    
    const initialValues = {
        name: '',
        url: '',
        description: '',
        type: 0
      };

    const handleClick = (event: any) => {
        hiddenFileInput.current.click();
      };

  const handleImageChange = (event:any) => {
    const file = event.target.files[0];
    console.log(file)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setArtist((prevData: any) => ({
            ...prevData,
            url: `/assets/photos/${file.name}`,
          }));
      };
      reader.readAsDataURL(file);
      console.log(reader)
    }
  };
    

    const handleInput = (e: any) => {
        const { name, value } = e.target;
        console.log(e.target)
        setArtist((prevData: any) => ({
          ...prevData,
          [name]: value,
        }));
        console.log(artist)
      };


  return (
    
    <Formik onSubmit={() => handleSubmit(artist)} initialValues={initialValues}>
        
   
    <Form >
        <Flex w={"95%"} direction={'column'} margin={2} gap={"6px"} justify={'space-between'} align={'center'}>
                <Flex justify={'space-between'}>
                    <FormControl width="45%" isRequired>
                        <FormLabel>Name</FormLabel>
                            <Input                     
                            name="name"
                            type="text"
                            onChange={handleInput}/>
                    </FormControl>
                    <FormControl width="45%" isRequired>
                        <FormLabel>Type</FormLabel>
                        <Select placeholder='Select type'
                        name="performertype_id"
                        onChange={handleInput}>
                            {types.map((type: any) => (
                            <option key={type.performertype_id} value={type.performertype_id}>{type.type}</option>
                            ))}
                        </Select>
                    </FormControl>
                </Flex>
                <FormControl w={"95%"} isRequired>
                    <FormLabel>Description</FormLabel>
                    <Textarea   name='description' marginTop={2} onChange={handleInput} required/>
                </FormControl>
                {selectedImage && (
                <Image src={selectedImage} h="200px" w="300px" objectFit="cover" />) } 
                
                <Input type="file" onChange={handleImageChange} style={{display: 'none'}} ref={hiddenFileInput} required/>
                <Flex w="95%" justify={'space-between'}>
                    <Button onClick={handleClick}>Upload artist image</Button>

                    <Button type="submit"  backgroundColor="secondary" _hover={{backgroundColor:"green"}}>Create artist</Button>    
                </Flex>
                
        </Flex>
        </Form>
    </Formik>
        
  )
}


