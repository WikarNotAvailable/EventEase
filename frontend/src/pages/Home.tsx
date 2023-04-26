import { CategoryCarousel } from '../components/pages/home/carousel/CategoryCarousel'


import 'swiper/css';
import { CategoryName } from '../components/pages/home/carousel/CategoryName';
import { PageContainer } from '../components/shared/containers/PageContainer';
import { Flex } from '@chakra-ui/react';

export const Home = () => {
  return (
    <PageContainer isCentered> 
      <Flex flexDir="column" w="100%" align="center">
        <CategoryName text='Music'></CategoryName>     
        <CategoryCarousel />

        <CategoryName text='Sport'></CategoryName>     
        <CategoryCarousel />

        <CategoryName text='Festivals'></CategoryName>     
        <CategoryCarousel />

        <CategoryName text='Art and theater'></CategoryName>     
        <CategoryCarousel />

        <CategoryName text='Special'></CategoryName>     
        <CategoryCarousel />

        <CategoryName text='Cabaret'></CategoryName>     
        <CategoryCarousel />

        <CategoryName text='Family'></CategoryName>     
        <CategoryCarousel />
      </Flex>
    </PageContainer>
  )
}
