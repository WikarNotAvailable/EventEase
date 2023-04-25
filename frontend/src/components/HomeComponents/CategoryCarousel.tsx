import { Flex, Text } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import { CarouselPhoto } from './CarouselPhoto';

import 'swiper/css';
import 'swiper/css/navigation';
export const CategoryCarousel = () => {
  const breakpoints = {
    // when window width is >= 640px
    0: {
      slidesPerView: 1,
      spaceBetween: 2
    },
    // when window width is >= 768px
    768: {
      slidesPerView: 2,
      spaceBetween: 3
    }
  };
 
  return (

    <Flex  width={"inherit"} marginBottom={2}  alignItems={'center'}>

        <Swiper  
            navigation
            autoplay = {{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            
            slidesPerView={3}
            spaceBetween={3}
            loop={true}
            breakpoints={breakpoints}
            centeredSlides={true}
            modules={[Navigation, Autoplay]}
            >
            <SwiperSlide><CarouselPhoto/><Text cursor={'default'} textColor={'#F9FAFB'}>coś się zbugowało i nie renderuje bez tekstu a wcześniej działało xd</Text></SwiperSlide>
            <SwiperSlide><CarouselPhoto/></SwiperSlide>
            <SwiperSlide><CarouselPhoto/></SwiperSlide>
            <SwiperSlide><CarouselPhoto/></SwiperSlide>
            <SwiperSlide><CarouselPhoto/></SwiperSlide>
            <SwiperSlide><CarouselPhoto/></SwiperSlide>
            
            
        </Swiper>

       

    </Flex>
   


  )
}


