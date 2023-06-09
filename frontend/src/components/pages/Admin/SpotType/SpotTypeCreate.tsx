import { Button, Flex, Input, FormControl, FormLabel} from '@chakra-ui/react'
import React, { FC, useState } from 'react'
import { Form, Formik } from 'formik'

interface ISpotTypeCreateProps
{
    handleSubmit: any
}
export const SpotTypeCreate :FC<ISpotTypeCreateProps> = ({handleSubmit}) => {
    const [type, setType] = useState({
      spotTypeName: ''
    })
    
    const initialValues = {
      spotTypeName: ''
      };

    const handleInput = (e: any) => {
        console.log(type)
        setType(() => ({
          spotTypeName: e.target.value,
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


          <Button type="submit"  backgroundColor="secondary" _hover={{backgroundColor:"green"}}>Create spot type</Button>    

                
        </Flex>
      </Form>
    </Formik>
        
  )
}


