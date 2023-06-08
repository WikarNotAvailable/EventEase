import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Flex, Input, Select, Textarea, Button, Image } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { FC, useEffect, useRef, useState } from 'react'


interface IArtistUpdateProps
{
    types: any,
    handleSubmitUpdate: any,
    artistToUpdate: any
}

export const ArtistUpdate :FC<IArtistUpdateProps> = ({types, handleSubmitUpdate, artistToUpdate}) => {

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
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setUrl(`/assets/photos/${file.name}`);
      };
      reader.readAsDataURL(file);
    }
  };
    
  const [name,setName] = useState(artistToUpdate?.name);
  const [type,setType] = useState(artistToUpdate?.performertype_id);
  const [description,setDescription] = useState(artistToUpdate?.description);
  const [url,setUrl] = useState(artistToUpdate?.url);

useEffect(() => {
    setName(artistToUpdate?.name)
    setType(artistToUpdate?.performertype_id);
    setDescription(artistToUpdate?.description); 
    setUrl(artistToUpdate?.url);
}, [artistToUpdate])

  const handleChangeName = (e:any)=>{
    setName(e.target.value); 
 }
 const handleChangeType = (e:any)=>{
    setType(e.target.value); 
 }
 const handleChangeDescription = (e:any)=>{
    setDescription(e.target.value); 
 }
 const handleChangeUrl = (e:any)=>{
    setUrl(e.target.value); 
 }
    
  return (
    <Formik onSubmit={() => handleSubmitUpdate(name, type, description, url, artistToUpdate.performer_id)} initialValues={initialValues}>
        
   
    <Form >
        <Flex w={"95%"} direction={'column'} margin={2} gap={"6px"} justify={'space-between'} align={'center'}>
                <Flex justify={'space-between'}>
                    <FormControl width="45%" isRequired>
                        <FormLabel>Name</FormLabel>
                            <Input                     
                            name="name"
                            type="text"
                            value={name}
                            onChange={handleChangeName}/>
                           
                    </FormControl>
                    <FormControl width="45%" isRequired>
                        <FormLabel>Type</FormLabel>
                        <Select placeholder='Select type'
                        name="performertype_id"
                        value={type}
                        onChange={handleChangeType}>
                            {types.map((type: any) => (
                            <option key={type.performertype_id} value={type.performertype_id}>{type.type}</option>
                            ))}
                        </Select>
                    </FormControl>
                </Flex>
                <FormControl w={"95%"} isRequired>
                    <FormLabel>Description</FormLabel>
                    <Textarea   name='description' marginTop={2} onChange={handleChangeDescription} required value={description}/>
                </FormControl>
                {(selectedImage || url) && (
                <Image src={artistToUpdate !== undefined ? url : selectedImage} h="200px" w="300px" objectFit="cover" />) } 
                
                <Input type="file" onChange={handleImageChange} style={{display: 'none'}} ref={hiddenFileInput} />
                <Flex w="95%" justify={'space-between'}>
                    <Button onClick={handleClick}>Upload artist image</Button>

                    <Button type="submit"  backgroundColor="secondary" _hover={{backgroundColor:"green"}}>Update artist</Button>    
                </Flex>
                
        </Flex>
        </Form>
    </Formik>
  )
}

