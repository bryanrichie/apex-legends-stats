import React from 'react';
import _ from 'lodash';
import { Alert, AlertIcon, AlertTitle, Box, CloseButton, Flex, Spinner } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { StringParam, useQueryParam } from 'use-query-params';
import { apexUsers } from '../api/api';
import { Users } from '../components/Users';

export const Home = () => {
  const [platform] = useQueryParam('platform', StringParam);
  const [searchTerm] = useQueryParam('search', StringParam);

  const { isLoading, data, isError } = useQuery(searchTerm || 'search', () => {
    if (_.isNil(platform) && _.isNil(searchTerm)) {
      return;
    } else {
      return apexUsers(platform || '', searchTerm || '');
    }
  });

  if (isLoading) {
    return (
      <Flex h="100vh" justify="center">
        <Spinner color="red" size="xl" />
      </Flex>
    );
  }

  if (isError) {
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>Hardcoding error as typing sucks</AlertTitle>
      <CloseButton position="absolute" right="8px" top="8px" />
    </Alert>;
  }

  if (!data) {
    return null;
  }

  return <Users apexUsers={data} />;
};
