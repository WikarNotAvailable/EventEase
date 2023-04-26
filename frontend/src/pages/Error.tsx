import { Button, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { PageContainer } from '../components/shared/containers/PageContainer'

export const Error = () => {
  return (
    <PageContainer isCentered props={{gap: '32px'}}>
      <Text fontSize="32px" fontWeight="600">Page not found</Text>
      <Link to="/" style={{width: '30%'}}>
        <Button bgColor="primary" _hover={{bgColor: "primary", opacity: '0.9'}} color="white" w="100%">Back to home</Button>
      </Link>
    </PageContainer>
  )
}
