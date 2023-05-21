import { Flex, Image, Text } from '@chakra-ui/react'


export const PerformerInfo = () => {
  return (
    <Flex direction={'column'} flex={'7 1 0'} borderRadius={'10'}>
        <Image src='/assets/photos/Kygo.webp' borderTopRadius={'10'}>

        </Image>

        <Text textAlign={'left'} 
            fontSize={'3xl'} 
            fontWeight={'bold'}
            backgroundColor="primary"
            backdropBrightness={'20%'}
            borderBottomRadius={'10'}
            paddingLeft={'5'}
            >
                Kygo
        </Text>

        <Text borderColor="border"
              borderWidth="4px"
              borderRadius={'10'}
              marginTop={'5'}
              padding={'3'}>
            

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac magna leo. Aenean pharetra nisi non tellus cursus elementum. Cras urna nisl, congue id nisi ac, maximus iaculis nunc. Phasellus interdum lorem vel posuere viverra. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed sodales fermentum ipsum quis convallis. Pellentesque suscipit ornare mattis. Nam justo leo, efficitur et tempus quis, porta non lacus. Aliquam nec condimentum sapien, eget feugiat dolor.

Aliquam eget neque varius, molestie arcu eu, auctor ligula. Nam luctus condimentum pulvinar. Aliquam nec ligula sed nisl suscipit commodo sed ut ante. Nunc lobortis sapien felis, ut ullamcorper sapien scelerisque quis. Etiam finibus consequat suscipit. Ut quis urna id sapien sodales dignissim. Nullam a bibendum ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Quisque dui justo, tincidunt ut gravida eu, iaculis vitae ex. Nam iaculis eros et finibus vulputate. Integer luctus eros metus. Ut eget elit efficitur felis bibendum sollicitudin fringilla facilisis ipsum. Ut viverra vitae diam eget consectetur. In vel commodo est. Vivamus lorem orci, suscipit a nisi in, placerat fermentum erat. Donec eget efficitur mi, eget porta arcu. Vivamus sed neque nunc. 

        </Text>
    </Flex>
  )
}

