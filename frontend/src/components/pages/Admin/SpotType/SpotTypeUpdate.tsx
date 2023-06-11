import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Flex, Input, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { FC, useEffect, useState } from 'react'


interface ISpotTypeUpdateProps
{
    handleSubmitUpdate: any,
    typeToUpdate: any
}

export const SpotTypeUpdate :FC<ISpotTypeUpdateProps> = ({handleSubmitUpdate, typeToUpdate}) => {

    
    const initialValues = {
        name: '',
      };

  const [name, setName] = useState(typeToUpdate?.type);

  useEffect(() => {
      setName(typeToUpdate?.name)
      console.log(typeToUpdate)
  }, [typeToUpdate])

  const handleChangeName = (e:any)=>{
    setName(e.target.value); 
 }

 
    
  return (
    <Formik onSubmit={() => handleSubmitUpdate(name, typeToUpdate.spottype_id)} initialValues={initialValues}>
        
   
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

