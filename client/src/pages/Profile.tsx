import { Alert, AlertIcon, AlertTitle, Box, CloseButton, Flex, Spinner } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { apexProfile } from '../api/api';

export const Profile = () => {
  const { platform, id } = useParams<{ platform: string; id: string }>();

  const { isLoading, data, error, isError } = useQuery(id || 'apexProfile', () => {
    return apexProfile(platform, id);
  });

  if (isLoading) {
    return (
      <Flex h="100vh" justify="center">
        <Spinner color="blue.500" size="xl" />
      </Flex>
    );
  }

  if (isError) {
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>{error}placeholder</AlertTitle>
      <CloseButton position="absolute" right="8px" top="8px" />
    </Alert>;
  }

  if (!data) {
    return null;
  }

  return <Box>{JSON.stringify(data, null, 2)}</Box>;
};
