import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';

export function App() {
  const [query, setQuery] = useState('');

  const apexProfile = async (username: string) => {
    try {
      const data = await axios.get(`http://localhost:8080/profile/origin/${username}`);
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.log('error', error);
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    apexProfile(query);
    setQuery('');
  };

  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Box
        bgImage="url('./kings-canyon-bg.jpg')"
        bgPosition="center"
        bgRepeat="no-repeat"
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        filter="blur(3px)"
        zIndex={-1}
      />
      <Flex bg="gray.700" w="100%" align="center" borderBottomLeftRadius={50}>
        <Image src="./apex-legends-logo.png" alt="logo" boxSize="100px" ml={5} mt={5} mb={5} />
        <Flex flexDir="column" align="center" mr={70}>
          <Heading color="white">Apex Legends</Heading>
          <Heading color="white">Stats</Heading>
        </Flex>
        <form onSubmit={onSubmit}>
          <InputGroup w={300}>
            <Input
              placeholder="Enter Origin Username"
              bg="white"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
            <InputRightElement
              children={<IconButton aria-label="Search API" icon={<SearchIcon />} />}
            />
          </InputGroup>
        </form>

        <HStack>
          <Text color="white" fontSize={20} fontWeight="bold" ml={50}>
            Leaderboards
          </Text>
        </HStack>
      </Flex>
    </Flex>
  );
}
