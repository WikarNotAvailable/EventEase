import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Flex, Input, Select, Textarea, Button, Image } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { FC, useEffect, useRef, useState } from 'react'


interface IArtistTypeUpdateProps
{
    handleSubmitUpdate: any,
    typeToUpdate: any
}

export const ArtistTypeUpdate :FC<IArtistTypeUpdateProps> = ({handleSubmitUpdate, typeToUpdate}) => {

    
    const initialValues = {
        name: '',
      };

  const [name, setName] = useState(typeToUpdate?.type);

  useEffect(() => {
      setName(typeToUpdate?.type)
  }, [typeToUpdate])

  const handleChangeName = (e:any)=>{
    setName(e.target.value); 
 }

 
    
  return (
    <Formik onSubmit={() => handleSubmitUpdate(name, typeToUpdate.performertype_id)} initialValues={initialValues}>
        
   
    <Form >
        <Flex w={"95%"} direction={'column'} margin={2} gap={"6px"} justify={'space-between'} align={'center'}>

          <FormControl width="45%" isRequired>
              <FormLabel>Name</FormLabel>
                  <Input                     
                  name="name"
                  type="text"
                  value={name}
                  onChange={handleChangeName}/>
                  
          </FormControl>


          <Button type="submit"  backgroundColor="secondary" _hover={{backgroundColor:"green"}}>Update artist type</Button>    

                
        </Flex>
        </Form>
    </Formik>
  )
}

