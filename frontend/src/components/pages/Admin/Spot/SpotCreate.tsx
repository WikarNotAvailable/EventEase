import { Button, Flex, Input, Select, Textarea, Image, FormControl, FormLabel, Box, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Checkbox } from '@chakra-ui/react'
import React, { FC, useRef, useState } from 'react'
import { Form, Formik } from 'formik'

interface ISpotCreateProps
{
    types: any,
    handleSubmit: any
}
export const SpotCreate :FC<ISpotCreateProps> = ({types, handleSubmit}) => {
    const [spot, setSpot] = useState({
        spottype_id: 0,
        address_id: 0,
        capacity: 0,
        isopen: false,
        name: '',
        description: '',
        spotimage: ''
    })

    const [address, setAddress] = useState({
      country: '',
      city: '',
      street: '',
      number: '',
  })
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
        setSpot((prevData: any) => ({
            ...prevData,
            spotimage: `/assets/photos/${file.name}`,
          }));
      };
      reader.readAsDataURL(file);

    }
  };
    

    const handleInput = (e: any) => {
        const { name, value } = e.target;

        setSpot((prevData: any) => ({
          ...prevData,
          [name]: value,
        }));

      };

      const handleInputCheckBox = (e: any) => {

        setSpot((prevData: any) => ({
          ...prevData,
          isopen: e.target.checked,
        }));

      };

      const handleInputAddress = (e: any) => {
        const { name, value } = e.target;

        setAddress((prevData: any) => ({
          ...prevData,
          [name]: value,
        }));

      };


  return (
    
    <Formik onSubmit={() => handleSubmit(spot, address)} initialValues={initialValues}>
        
   
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
                  name="spottype_id"
                  onChange={handleInput}>
                      {types.map((type: any) => (
                      <option key={type.spottype_id} value={type.spottype_id}>{type.name}</option>
                      ))}
                  </Select>
              </FormControl>
          </Flex>

          <Flex justify={'space-between'}>
            <FormControl isRequired>
              <FormLabel>Capacity</FormLabel>
              <NumberInput  min={1}>
                <NumberInputField name="capacity" onChange={handleInput}/>
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl marginLeft={5}>
            <FormLabel>Open</FormLabel>
            <Checkbox name="isopen" onChange={handleInputCheckBox}>

            </Checkbox>
            </FormControl>

          </Flex >

          <Flex justify={'space-between'}>
            <FormControl isRequired>
              <FormLabel>Country</FormLabel>
                      <Input                     
                      name="country"
                      type="text"
                      onChange={handleInputAddress}/>

            </FormControl>

            <FormControl isRequired>
              <FormLabel>City</FormLabel>
                      <Input                     
                      name="city"
                      type="text"
                      onChange={handleInputAddress}/>

            </FormControl>

          </Flex >

          <Flex justify={'space-between'}>
            <FormControl isRequired>
              <FormLabel>Street</FormLabel>
                      <Input                     
                      name="street"
                      type="text"
                      onChange={handleInputAddress}/>

            </FormControl>

            <FormControl isRequired>
              <FormLabel>Number</FormLabel>
                      <Input                     
                      name="number"
                      type="text"
                      onChange={handleInputAddress}/>

            </FormControl>

          </Flex >

          <FormControl w={"95%"} isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea   name='description' marginTop={2} onChange={handleInput} required/>
          </FormControl>
          {selectedImage && (
          <Image src={selectedImage} h="200px" w="300px" objectFit="cover" />) } 
          
          <Input type="file" onChange={handleImageChange} style={{display: 'none'}} ref={hiddenFileInput} required/>
          <Flex w="95%" justify={'space-between'}>
              <Button onClick={handleClick}>Upload spot image</Button>

              <Button type="submit"  backgroundColor="secondary" _hover={{backgroundColor:"green"}}>Create spot</Button>    
          </Flex>
                
        </Flex>
      </Form>
    </Formik>
        
  )
}


