import React from 'react';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { apexProfile } from '../api/api';
import { Alert, AlertIcon, AlertTitle, Box, CloseButton, Flex, Spinner } from '@chakra-ui/react';

export const Profile = () => {
  const { platform, id } = useParams<{ platform: string; id: string }>();

  const { isLoading, data, error, isError } = useQuery(id || 'apexProfile', () => {
    return apexProfile(platform, id);
  });

  if (isLoading) {
    return (
      <Flex h="100vh" justify="center">
        <Spinner color="red" size="xl" />
      </Flex>
    );
  }

  // Note: for some reason error (line 12) is typed as unknown, usually is of type Error
  if (isError) {
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>Placeholder</AlertTitle>
      <CloseButton position="absolute" right="8px" top="8px" />
    </Alert>;
  }

  if (!data) {
    return null;
  }

  return <Box>{JSON.stringify(data, null, 2)}</Box>;
};
