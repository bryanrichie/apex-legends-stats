import { Avatar, HStack, Text, Wrap, WrapItem } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import { ApexUser } from '../api/api';

interface Props {
  apexUsers: ApexUser[];
}

export const Users = (props: Props) => {
  const { apexUsers } = props;

  const users = _.map(apexUsers, (user) => {
    return (
      <Link to={`/profile/${user.platformSlug}/${user.platformUserIdentifier}`}>
        <WrapItem
          bg="gray.700"
          borderRadius={10}
          p={2}
          w={200}
          alignItems="center"
          key={user.platformUserIdentifier}
        >
          <HStack maxWidth={175}>
            <Avatar src={user.avatarUrl} size="sm" />
            <Text color="white" isTruncated>
              {user.platformUserIdentifier}
            </Text>
          </HStack>
        </WrapItem>
      </Link>
    );
  });
  return (
    <Wrap justify="center" spacing={5}>
      {users}
    </Wrap>
  );
};
