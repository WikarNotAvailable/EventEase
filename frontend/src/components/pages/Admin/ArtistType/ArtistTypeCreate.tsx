import { Button, Flex, Input, FormControl, FormLabel, Box } from '@chakra-ui/react'
import React, { FC, useRef, useState } from 'react'
import { Form, Formik } from 'formik'

interface IArtistTypeCreateProps
{
    handleSubmit: any
}
export const ArtistTypeCreate :FC<IArtistTypeCreateProps> = ({handleSubmit}) => {
    const [type, setType] = useState({
      performerTypeName: ''
    })
    
    const initialValues = {
      performerTypeName: ''
      };

    const handleInput = (e: any) => {
        console.log(type)
        setType(() => ({
          performerTypeName: e.target.value,
        }));
      };


  return (
    
    <Formik onSubmit={() => handleSubmit(type)} initialValues={initialValues}>
        
   
      <Form >
        <Flex w={"95%"} direction={'column'} margin={2} gap={"6px"} justify={'space-between'} align={'center'}>
          <FormControl width="45%" isRequired>
              <FormLabel>Name</FormLabel>
                  <Input                     
                  name="name"
                  type="text"
                  onChange={handleInput}/>
          </FormControl>


          <Button type="submit"  backgroundColor="secondary" _hover={{backgroundColor:"green"}}>Create artist type</Button>    

                
        </Flex>
      </Form>
    </Formik>
        
  )
}


