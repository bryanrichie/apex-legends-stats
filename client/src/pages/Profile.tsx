import {
  Alert,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Center,
  CloseButton,
  Flex,
  HStack,
  Image,
  Link,
  Spinner,
  Text,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { apexProfile, SocialAccount } from '../api/api';

const SocialsCheck = (props: { socialAccounts: SocialAccount[] }) => {
  const { socialAccounts } = props;
  const accounts = _.map(socialAccounts, (socialAccount) => {
    switch (socialAccount.platformSlug) {
      case 'twitter': {
        return (
          <Link
            href={`https://twitter.com/${socialAccount.platformUserIdentifier}`}
            isExternal
            key={socialAccount.platformSlug}
          >
            <Image src="/twitter-logo.png" alt="twitter logo" boxSize={65} fit="scale-down" />
          </Link>
        );
      }
      case 'twitch': {
        return (
          <Link
            href={`https://twitch.tv/${socialAccount.platformUserIdentifier}`}
            isExternal
            key={socialAccount.platformSlug}
          >
            <Image src="/twitch-logo.png" alt="twitch logo" boxSize={45} fit="scale-down" />
          </Link>
        );
      }
      default:
        return null;
    }
  });
  return <>{accounts}</>;
};

export const Profile = () => {
  const { platform, id } = useParams<{ platform: string; id: string }>();

  const { isFetching, data, error, isError } = useQuery(
    'apexProfile',
    () => {
      return apexProfile(platform, id);
    },
    {
      refetchOnWindowFocus: false,
    }
  );

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

  const { segments, platformInfo, userInfo } = data;

  const topLegendStats = _.orderBy(
    _.tail(segments),
    (segment) => {
      return segment.stats?.kills?.value;
    },
    ['desc']
  );

  const percentageCalc = (percentile: number): number => {
    return Math.round((100 - percentile) * 100) / 100;
  };

  const platformLogoCheck = () => {
    if (platformInfo.platformSlug === 'origin') {
      return '/origin-logo.png';
    } else if (platformInfo.platformSlug === 'psn') {
      return '/psn-logo.png';
    } else if (platformInfo.platformSlug === 'xbl') {
      return '/xbl-logo.png';
    }
  };

  const legendStats = _.map(topLegendStats, (legend) => {
    const legendStatDisplay = () => {
      if (!_.isUndefined(legend.stats.kills)) {
        return (
          <Flex
            bg="gray.700"
            w="70%"
            p={5}
            mx={5}
            borderRadius={10}
            mb={5}
            flexDir="column"
            key={legend.metadata.name}
          >
            <Center justifyContent="space-between">
              <HStack>
                <Image src={legend.metadata.imageUrl} boxSize={20} />
                <Text color="white" fontSize={30}>
                  {legend.metadata.name}
                </Text>
              </HStack>
              <Box bg="gray.600" w="35%" p={2} borderRadius={5} align="center">
                <VStack color="white">
                  <Text>Kills</Text>
                  <Text>{legend.stats.kills.value}</Text>
                  <Text>Top {percentageCalc(legend.stats.kills.percentile)}%</Text>
                </VStack>
              </Box>
            </Center>
          </Flex>
        );
      } else {
        return null;
      }
    };
    return legendStatDisplay();
  });
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
            <Image src={platformLogoCheck()} alt="origin logo" boxSize={35} fit="scale-down" />
            <Text color="white" fontSize={40} fontWeight="bold">
              {platformInfo.platformUserIdentifier}
            </Text>
          </HStack>
          <HStack mr={5} spacing={10}>
            <SocialsCheck socialAccounts={userInfo.socialAccounts} />
          </HStack>
        </Flex>
      </Wrap>

      <Flex bg="gray.700" w="70%" p={5} mx={5} borderRadius={10} mb={5} flexDir="column">
        <Text color="white" fontSize={30}>
          Lifetime Overview
        </Text>
        <HStack>
          <Image src={segments[0].stats.rankScore.metadata?.iconUrl} alt="rank logo" boxSize={20} />
          <VStack color="white" align="left">
            <Text>{segments[0].stats.rankScore.metadata?.rankName}</Text>
            <Text>{segments[0].stats.rankScore.displayValue} RP</Text>
            {!_.isNull(segments[0].stats.rankScore.rank) ? (
              <Text>#{segments[0].stats.rankScore.rank} </Text>
            ) : null}
            ;
          </VStack>
        </HStack>
        <HStack justifyContent="space-around" mt={5}>
          <Box bg="gray.600" w="25%" p={2} borderRadius={5} align="center">
            <VStack color="white">
              <Text>Matches Played </Text>
              <Text>{segments[0].stats.matchesPlayed.displayValue}</Text>
              <Text>Top {percentageCalc(segments[0].stats.matchesPlayed.percentile)}%</Text>
            </VStack>
          </Box>
          <Box bg="gray.600" w="25%" p={2} borderRadius={5} align="center">
            <VStack color="white">
              <Text>Level</Text>
              <Text>{segments[0].stats.level.displayValue}</Text>
              <Text>Top {percentageCalc(segments[0].stats.level.percentile)}%</Text>
            </VStack>
          </Box>
          <Box bg="gray.600" w="25%" p={2} borderRadius={5} align="center">
            <VStack color="white">
              <Text>Kills</Text>
              <Text>{segments[0].stats.kills.displayValue}</Text>
              <Text>Top {percentageCalc(segments[0].stats.kills.percentile)}%</Text>
            </VStack>
          </Box>
        </HStack>
      </Flex>
      {legendStats}
    </Flex>
  );
};
