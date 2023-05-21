import { Grid, Text } from '@chakra-ui/react'
import React from 'react'
import { SimilarPerformersItem } from './SimilarPerformersItem'

export const SimilarPerformers = () => {
  return (
    <Grid  marginLeft={'10'} alignItems={'flex-start'} maxHeight={'900'} flex={'3 1 0 '}>
        <Text fontSize={'25'} 
            textAlign={'center'}
            borderBottomColor="border"
            borderBottomWidth="4px"
            >
            You may also like
        </Text>

        <SimilarPerformersItem></SimilarPerformersItem>
        <SimilarPerformersItem></SimilarPerformersItem>
        <SimilarPerformersItem></SimilarPerformersItem>
        <SimilarPerformersItem></SimilarPerformersItem>
        <SimilarPerformersItem></SimilarPerformersItem>
        <SimilarPerformersItem></SimilarPerformersItem>

    </Grid>
  )
}

