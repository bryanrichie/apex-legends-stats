import {
  Box,
  Button,
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
import React from 'react';
import { SearchIcon } from '@chakra-ui/icons';

function App() {
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
        <InputGroup w={300}>
          <Input placeholder="Enter Origin Username" bg="white" />
          <InputRightElement
            children={<IconButton aria-label="Search API" icon={<SearchIcon />} />}
          />
        </InputGroup>

        <HStack>
          <Text color="white" fontSize={20} fontWeight="bold" ml={50}>
            Leaderboards
          </Text>
        </HStack>
      </Flex>
    </Flex>
  );
}

export default App;
