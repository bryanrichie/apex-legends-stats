import { SearchIcon } from '@chakra-ui/icons';
import { Box, Flex, Spinner } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { StringParam, useQueryParam } from 'use-query-params';
import { apexProfile, ApexUser, apexUsers } from '../api/api';
import { Users } from '../components/Users';

export const Home = () => {
  const [platform] = useQueryParam('platform', StringParam);
  const [searchTerm] = useQueryParam('search', StringParam);

  const { isFetching, data, error } = useQuery(searchTerm || 'search', () => {
    if (_.isNil(platform) && _.isNil(searchTerm)) {
      return;
    } else {
      return apexUsers(platform || '', searchTerm || '');
    }
  });

  if (isFetching) {
    return <Spinner color="red" size="xl" />;
  }

  if (error) {
    // Return some form of chakra error e
    return <Box>cock cock</Box>;
  }

  if (!data) {
    return null;
  }

  return <Users apexUsers={data} />;
};
