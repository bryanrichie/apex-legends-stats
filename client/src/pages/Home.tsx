import { Alert, AlertIcon, AlertTitle, Flex, Spinner } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { useQuery } from 'react-query';
import { StringParam, useQueryParam } from 'use-query-params';
import { apexUsers } from '../api/api';
import { Users } from '../components/Users';

export const Home = () => {
  const [platform] = useQueryParam('platform', StringParam);
  const [searchTerm] = useQueryParam('search', StringParam);

  const { isFetching, data, error, isError } = useQuery(
    searchTerm || 'search',
    () => {
      if (!_.isNil(platform) && !_.isNil(searchTerm)) {
        return apexUsers(platform, searchTerm);
      }
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isFetching) {
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
