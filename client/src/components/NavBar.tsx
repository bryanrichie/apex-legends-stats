import React from 'react';
import _ from 'lodash';
import { Flex, Heading, HStack, Image, Input, InputGroup, Select, Text } from '@chakra-ui/react';
import { StringParam, useQueryParam } from 'use-query-params';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  const [platform, setPlatform] = useQueryParam('platform', StringParam);
  const [searchTerm, setSearchTerm] = useQueryParam('search', StringParam);

  const onChange = _.debounce((value: string) => {
    setSearchTerm(value);
  }, 500);

  // bg:
  // <Flex flexDirection="column" minHeight="100vh" flexWrap="wrap">
  // <Box
  //   bgImage="url('./kings-canyon-bg.jpg')"
  //   bgPosition="center"
  //   bgRepeat="no-repeat"
  //   position="absolute"
  //   top={0}
  //   left={0}
  //   right={0}
  //   bottom={0}
  //   filter="blur(3px)"
  //   zIndex={-1}/>
  //   </Flex>

  return (
    <Flex bg="gray.700" align="center" borderBottomLeftRadius={50} mb={5}>
      <Link to="/">
        <Image src="./apex-legends-logo.png" alt="logo" boxSize="100px" ml={5} mt={5} mb={5} />
        <Flex flexDir="column" align="center" mr={70}>
          <Heading color="white">Apex Legends</Heading>
          <Heading color="white">Stats</Heading>
        </Flex>
      </Link>
      {/* <form onSubmit={onSubmit}> */}
      <Flex>
        <Select
          placeholder="Select Platform"
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
            placeholder="Enter Origin Username"
            bg="white"
            onChange={(e) => onChange(e.target.value)}
            defaultValue={''}
          />
        </InputGroup>
      </Flex>
      {/* </form> */}
      <HStack>
        <Text color="white" fontSize={20} fontWeight="bold" ml={50}>
          Leaderboards
        </Text>
      </HStack>
    </Flex>
  );
};
