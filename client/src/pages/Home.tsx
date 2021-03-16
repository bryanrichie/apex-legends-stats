import React from 'react';
import _ from 'lodash';
import { Alert, AlertIcon, AlertTitle, Box, Flex, Spinner } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { StringParam, useQueryParam } from 'use-query-params';

import { apexUsers } from '../api/api';
import { Users } from '../components/Users';

export const Home = () => {
  const [platform] = useQueryParam('platform', StringParam);
  const [searchTerm] = useQueryParam('search', StringParam);

  const { isLoading, data, error, isError } = useQuery(searchTerm || 'search', () => {
    if (!_.isNil(platform) && !_.isNil(searchTerm)) {
      return apexUsers(platform, searchTerm);
    }
  });

  if (isLoading) {
    return (
      <Flex h="100vh" justify="center">
        <Spinner color="red" />
      </Flex>
    );
  }

  if (isError) {
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>{error}placeholder</AlertTitle>
    </Alert>;
  }

  if (!data) {
    return null;
  }

  return <Users apexUsers={data} />;
};
