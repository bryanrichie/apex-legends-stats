import {
  Alert,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  Spinner,
  Text,
  Image,
  AspectRatio,
  Wrap,
  Spacer,
  VStack,
} from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { apexProfile } from '../api/api';

export const Profile = () => {
  const { platform, id } = useParams<{ platform: string; id: string }>();

  const { isFetching, isLoading, data, error, isError } = useQuery(id || 'apexProfile', () => {
    return apexProfile(platform, id);
  });

  if (isFetching) {
    return (
      <Flex h="100vh" justify="center">
        <Spinner color="blue.500" size="xl" />
      </Flex>
    );
  }

  if (isError) {
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>{error}placeholder</AlertTitle>
      <CloseButton position="absolute" right="8px" top="8px" />
    </Alert>;
  }

  if (!data) {
    return null;
  }

  const { segments, platformInfo } = data;

  const topFourSegments = _.slice(segments, 0, 4);

  const percentageCalc = (percentile: number): number => {
    return Math.round((100 - percentile) * 100) / 100;
  };

  return (
    <Flex flexDir="column">
      <Box
        bg="gray.600"
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
      <Wrap>
        <Flex bg="gray.700" w="100%" p={5} mx={5} borderRadius={10} justify="space-between" mb={5}>
          <HStack spacing={5}>
            <Avatar src={platformInfo.avatarUrl} size="xl" />
            <Image
              src="https://techgage.com/wp-content/uploads/2013/10/EA-Origin-Logo.png"
              alt="origin logo"
              boxSize={35}
              fit="scale-down"
            />
            <Text color="white" fontSize={40} fontWeight="bold">
              {platformInfo.platformUserIdentifier}
            </Text>
            <Image src="/canada-icon.png" alt="canada logo" boxSize={10} fit="scale-down" pt={3} />
          </HStack>
          <HStack mr={5} spacing={10}>
            <Image src="/twitch-logo.png" alt="twitch logo" boxSize={45} fit="scale-down" />
            <Image src="/twitter-logo.png" alt="twitter logo" boxSize={65} fit="scale-down" />
          </HStack>
        </Flex>
      </Wrap>

      <Flex bg="gray.700" w="70%" p={5} mx={5} borderRadius={10} mb={5} flexDir="column">
        <Text color="white" fontSize={30}>
          Lifetime Overview
        </Text>

        <HStack>
          <Image
            src={topFourSegments[0].stats.rankScore.metadata?.iconUrl}
            alt="rank logo"
            boxSize={20}
          />
          <Text color="white">
            {topFourSegments[0].stats.rankScore.metadata?.rankName} <br />
            {topFourSegments[0].stats.rankScore.displayValue} RP <br />#
            {topFourSegments[0].stats.rankScore.rank}
          </Text>
        </HStack>
        <HStack justifyContent="space-around" mt={5}>
          <Box bg="gray.600" w="25%" p={2} borderRadius={5} align="center">
            <Text color="white">
              Matches Played <br /> {topFourSegments[0].stats.matchesPlayed.displayValue}
              <br />
              Top {percentageCalc(topFourSegments[0].stats.matchesPlayed.percentile)}%
            </Text>
          </Box>
          <Box bg="gray.600" w="25%" p={2} borderRadius={5} align="center">
            {' '}
            <Text color="white">
              Level <br /> {topFourSegments[0].stats.level.displayValue} <br /> #
              {topFourSegments[0].stats.level.rank} | Top{' '}
              {percentageCalc(topFourSegments[0].stats.level.percentile)}%
            </Text>
          </Box>
          <Box bg="gray.600" w="25%" p={2} borderRadius={5} align="center">
            {' '}
            <Text color="white">
              Kills <br /> {topFourSegments[0].stats.kills.displayValue}
              <br /> #{topFourSegments[0].stats.kills.rank} | Top{' '}
              {percentageCalc(topFourSegments[0].stats.kills.percentile)}%
            </Text>
          </Box>
        </HStack>
      </Flex>
      <Flex bg="gray.700" w="70%" p={5} mx={5} borderRadius={10} mb={5} flexDir="column">
        <HStack>
          <Image src={topFourSegments[1].metadata.imageUrl} boxSize={20} />
          <Text color="white" fontSize={30}>
            {topFourSegments[1].metadata.name}
          </Text>
        </HStack>
        <HStack justifyContent="center" mt={5} spacing={20}>
          {/* <Box bg="gray.600" w="35%" p={2} borderRadius={5} align="center">
            <Text color="white">
              Matches Played <br /> {topFourSegments[1].stats.matchesPlayed.displayValue}
              <br />
              Top {percentageCalc(topFourSegments[1].stats.matchesPlayed.percentile)}%
            </Text>
          </Box> */}
          <Box bg="gray.600" w="35%" p={2} borderRadius={5} align="center">
            {' '}
            <Text color="white">
              Kills <br /> {topFourSegments[1].stats.kills.displayValue}
              <br /> #{topFourSegments[1].stats.kills.rank} | Top{' '}
              {percentageCalc(topFourSegments[1].stats.kills.percentile)}%
            </Text>
          </Box>
        </HStack>
      </Flex>
      <Flex bg="gray.700" w="70%" p={5} mx={5} borderRadius={10} mb={5} flexDir="column">
        <HStack>
          <Image src={topFourSegments[2].metadata.imageUrl} boxSize={20} />
          <Text color="white" fontSize={30}>
            {topFourSegments[2].metadata.name}
          </Text>
        </HStack>
        <HStack justifyContent="center" mt={5} spacing={20}>
          {/* <Box bg="gray.600" w="35%" p={2} borderRadius={5} align="center">
            <Text color="white">
              Matches Played <br /> {topFourSegments[2].stats.matchesPlayed.displayValue}
              <br />
              Top {percentageCalc(topFourSegments[2].stats.matchesPlayed.percentile)}%
            </Text>
          </Box> */}
          <Box bg="gray.600" w="35%" p={2} borderRadius={5} align="center">
            {' '}
            <Text color="white">
              Kills <br /> {topFourSegments[2].stats.kills.displayValue}
              <br /> #{topFourSegments[2].stats.kills.rank} | Top{' '}
              {percentageCalc(topFourSegments[2].stats.kills.percentile)}%
            </Text>
          </Box>
        </HStack>
      </Flex>
      <Flex bg="gray.700" w="70%" p={5} mx={5} borderRadius={10} mb={5} flexDir="column">
        <HStack>
          <Image src={topFourSegments[3].metadata.imageUrl} boxSize={20} />
          <Text color="white" fontSize={30}>
            {topFourSegments[3].metadata.name}
          </Text>
        </HStack>
        <HStack justifyContent="center" mt={5} spacing={20}>
          {/* <Box bg="gray.600" w="35%" p={2} borderRadius={5} align="center">
            <Text color="white">
              Matches Played <br /> {topFourSegments[3].stats.matchesPlayed.displayValue}
              <br />
              Top {percentageCalc(topFourSegments[3].stats.matchesPlayed.percentile)}%
            </Text>
          </Box> */}
          <Box bg="gray.600" w="35%" p={2} borderRadius={5} align="center">
            {' '}
            <Text color="white">
              Kills <br /> {topFourSegments[3].stats.kills.displayValue}
              <br /> #{topFourSegments[3].stats.kills.rank} | Top{' '}
              {percentageCalc(topFourSegments[3].stats.kills.percentile)}%
            </Text>
          </Box>
        </HStack>
      </Flex>
    </Flex>
  );
};
