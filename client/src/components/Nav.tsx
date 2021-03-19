import { SearchIcon } from '@chakra-ui/icons';
import {
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { StringParam, useQueryParam } from 'use-query-params';

export const Nav = () => {
  const [platform, setPlatform] = useState('origin');
  const [query, setQuery] = useState('');
  const [urlPlatform, setUrlPlatform] = useQueryParam('platform', StringParam);
  const [urlQuery, setUrlQuery] = useQueryParam('search', StringParam);

  const onSubmit = (e: any) => {
    e.preventDefault();
    setUrlPlatform(platform);
    setUrlQuery(query);
    setQuery('');
  };

  return (
    <Flex bg="gray.700" align="center" borderBottomLeftRadius={50} mb={5}>
      <Image src="./apex-legends-logo.png" alt="logo" boxSize="100px" ml={5} mt={5} mb={5} />
      <Flex flexDir="column" align="center" mr={70}>
        <Heading color="white">Apex Legends</Heading>
        <Heading color="white">Stats</Heading>
      </Flex>
      <HStack>
        <form onSubmit={onSubmit}>
          <Flex>
            <Select
              bg="white"
              w={200}
              onChange={(e) => {
                setPlatform(e.target.value);
              }}
            >
              <option value="origin">Origin</option>
              <option value="xbl">Xbox Live</option>
              <option value="psn">Playstation Network</option>
            </Select>
            <InputGroup w={300}>
              <Input
                placeholder="Enter Username"
                bg="white"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <InputRightElement
                children={
                  <IconButton onClick={onSubmit} aria-label="Search API" icon={<SearchIcon />} />
                }
              />
            </InputGroup>
          </Flex>
        </form>
        <Link to="/">
          <Text color="white" fontSize={20} fontWeight="bold" ml={50}>
            Home
          </Text>
        </Link>
      </HStack>
    </Flex>
  );
};
