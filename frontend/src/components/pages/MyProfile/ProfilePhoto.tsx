import { Flex, Image, position} from '@chakra-ui/react'



export const ProfilePhoto = () => {
  return (
     
            <Image src='/assets/photos/user.jpg' width={"250"} height={"250"} 
            borderRadius={'500'} border={"4px"} 
            position={"absolute"} top={"32"} shadow={"2xl"}>
            </Image>


        
  
  )
}