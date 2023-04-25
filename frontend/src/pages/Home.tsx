import { Container } from '@chakra-ui/react'
import { CategoryCarousel } from '../components/HomeComponents/CategoryCarousel'


import 'swiper/css';
import { CategoryName } from '../components/HomeComponents/CategoryName';

export const Home = () => {
  return (
 
    <Container centerContent maxWidth={"85%"}> 
      <CategoryName categoryName='Music'></CategoryName>     
      <CategoryCarousel ></CategoryCarousel>

      <CategoryName categoryName='Sport'></CategoryName>     
      <CategoryCarousel ></CategoryCarousel>

      <CategoryName categoryName='Festivals'></CategoryName>     
      <CategoryCarousel ></CategoryCarousel>

      <CategoryName categoryName='Art and theater'></CategoryName>     
      <CategoryCarousel ></CategoryCarousel>

      <CategoryName categoryName='Special'></CategoryName>     
      <CategoryCarousel ></CategoryCarousel>

      <CategoryName categoryName='Cabaret'></CategoryName>     
      <CategoryCarousel ></CategoryCarousel>

      <CategoryName categoryName='Family'></CategoryName>     
      <CategoryCarousel ></CategoryCarousel>


    </Container>
  )
}
