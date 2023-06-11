import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Flex, Input, Select, Textarea, Button, Image, NumberInput, NumberInputStepper, NumberInputField, NumberIncrementStepper, Checkbox, NumberDecrementStepper } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { FC, useEffect, useRef, useState } from 'react'


interface ISpotUpdateProps
{
    types: any,
    handleSubmitUpdate: any,
    spotToUpdate: any
}

export const SpotUpdate :FC<ISpotUpdateProps> = ({types, handleSubmitUpdate, spotToUpdate}) => {

    const [selectedImage, setSelectedImage] = useState<any>();
    const hiddenFileInput = useRef<any>();
    
    const initialValues = {
      spottype_id: 0,
      address_id: 0,
      capacity: 0,
      isopen: false,
      name: '',
      description: '',
      spotimage: '',
      country: '',
      city: '',
      street: '',
      number: '',
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
    
  const [name,setName] = useState(spotToUpdate?.name);
  const [type,setType] = useState(spotToUpdate?.spottype_id);
  const [description,setDescription] = useState(spotToUpdate?.description);
  const [url,setUrl] = useState(spotToUpdate?.spotimage);
  const [capacity,setCapacity] = useState(spotToUpdate?.capacity);
  const [isOpen,setIsOpen] = useState(spotToUpdate?.isopen);
  //const [address,setAddress] = useState(spotToUpdate?.address_id);

  const [country,setCountry] = useState(spotToUpdate?.address?.country);
  const [city,setCity] = useState(spotToUpdate?.address?.city);
  const [street,setStreet] = useState(spotToUpdate?.address?.street);
  const [number,setNumber] = useState(spotToUpdate?.address?.number);


useEffect(() => {
  console.log(spotToUpdate)
    setName(spotToUpdate?.name)
    setType(spotToUpdate?.spottype_id);
    setDescription(spotToUpdate?.description); 
    setUrl(spotToUpdate?.spotimage);
    setCapacity(spotToUpdate?.capacity)
    setIsOpen(spotToUpdate?.isopen)
    //setAddress(spotToUpdate?.address_id)

    setCountry(spotToUpdate?.address?.country)
    setCity(spotToUpdate?.address?.city);
    setStreet(spotToUpdate?.address?.street);
    setNumber(spotToUpdate?.address?.number);
}, [spotToUpdate])

  const handleChangeName = (e:any)=>{
    setName(e.target.value); 
 }
 const handleChangeType = (e:any)=>{
    setType(e.target.value); 
 }
 const handleChangeCapacity = (e:any)=>{
    setCapacity(e.target.value); 
 }

 const handleChangeIsOpen = (e:any)=>{
  setIsOpen(e.target.checked); 
}


const handleChangeDescription = (e:any)=>{
  setDescription(e.target.value); 
}


const handleChangeCountry = (e:any)=>{
  setCountry(e.target.value); 
}

const handleChangeCity = (e:any)=>{
  setCity(e.target.value); 
}

const handleChangeStreet = (e:any)=>{
  setStreet(e.target.value); 
}

const handleChangeNumber = (e:any)=>{
  setNumber(e.target.value); 
}

    
  return (
    <Formik onSubmit={() => handleSubmitUpdate(name, type, description, url, capacity, isOpen, spotToUpdate.spot_id, country, city, street, number, spotToUpdate.address_id)} initialValues={initialValues}>
        
   
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
                  name="spottype_id"
                  value={type}
                  onChange={handleChangeType}>
                      {types.map((type: any) => (
                      <option key={type.spottype_id} value={type.spottype_id}>{type.name}</option>
                      ))}
                  </Select>
              </FormControl>
          </Flex>

          <Flex justify={'space-between'}>
            <FormControl isRequired>
              <FormLabel>Capacity</FormLabel>
              <NumberInput  min={1}  value={capacity} name="capacity" onChange={handleChangeCapacity}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl >
            <FormControl marginLeft={'5'}>
            <FormLabel>Open</FormLabel>
            <Checkbox name="isopen"  isChecked={isOpen} onChange={handleChangeIsOpen}>

            </Checkbox>
            </FormControl>

          </Flex >

          <Flex justify={'space-between'}>
            <FormControl isRequired>
              <FormLabel>Country</FormLabel>
                      <Input                     
                      name="country"
                      value={country}
                      type="text"
                      onChange={handleChangeCountry}/>

            </FormControl>

            <FormControl isRequired>
              <FormLabel>City</FormLabel>
                      <Input                     
                      name="city"
                      value={city}
                      type="text"
                      onChange={handleChangeCity}/>

            </FormControl>

          </Flex >

          <Flex justify={'space-between'}>
            <FormControl isRequired>
              <FormLabel>Street</FormLabel>
                      <Input                     
                      name="street"
                      value={street}
                      type="text"
                      onChange={handleChangeStreet}/>

            </FormControl>

            <FormControl isRequired>
              <FormLabel>Number</FormLabel>
                      <Input                     
                      name="number"
                      value={number}
                      type="text"
                      onChange={handleChangeNumber}/>

            </FormControl>

          </Flex >

          <FormControl w={"95%"} isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea   name='description' value={description} marginTop={2} onChange={handleChangeDescription} required/>
          </FormControl>
          {(selectedImage|| url) && (
          <Image src={spotToUpdate !== undefined ? url : selectedImage} h="200px" w="300px" objectFit="cover" />) } 
          
          <Input type="file" onChange={handleImageChange} style={{display: 'none'}} ref={hiddenFileInput} required/>
          <Flex w="95%" justify={'space-between'}>
              <Button onClick={handleClick}>Upload spot image</Button>

              <Button type="submit"  backgroundColor="secondary" _hover={{backgroundColor:"green"}}>Update spot</Button>    
          </Flex>
                
        </Flex>
      </Form>
    </Formik>
  )
}

