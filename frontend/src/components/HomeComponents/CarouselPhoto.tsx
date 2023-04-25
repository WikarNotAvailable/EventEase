import { Box, Grid, Text } from '@chakra-ui/react'
import  { useState } from 'react'

export const CarouselPhoto = () => {
    const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
        backgroundImage='event.jpg'
        backgroundSize="cover"
        backgroundPosition="center"
        height="300px"
        width="100%"
        position="relative"
        cursor={'pointer'}
        borderRadius={10}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)} 
        
    >  
        <Grid  
          borderRadius={10} 
          padding={1.5}          
          top="82%"
          position={'absolute'}
          width={"100%"}
          backgroundColor={isHovered ? 'whiteAlpha.600': 'whiteAlpha.400'}
          >
            <Text textColor={'white'}
                fontFamily={"monospace"}
                fontSize={15}
                fontWeight={'light'}>
                Fajerwerki - dom fajerwerków Warszawa
            </Text>
            <Text textColor={'black'}
                    fontFamily={"monospace"}
                    fontSize={14}
                    >
                Warszawa - 31.12.2023
            </Text>

        </Grid>
        
    </Box>
  )
}


