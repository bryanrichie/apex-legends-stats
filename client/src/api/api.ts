import axios from 'axios';

export interface ApexUser {
  avatarUrl: string;
  platformSlug: string;
  platformUserIdentifier: string;
}

export interface ApexProfile {
  metadata: {
    activeLegendName: string;
  };
  platformInfo: {
    avatarUrl: string;
    platformSlug: string;
    platformUserIdentifier: string;
  };
  segments: [
    {
      metadata: {
        name: string;
        imageUrl?: string;
      };
      stats: {
        [key: string]: {
          rank: number;
          percentile: number;
          value: number;
          displayName: string;
          displayCategory: string;
          displayValue?: string;
          metadata: {
            iconUrl: string;
            rankName: string;
          } | null;
        };
      };
    }
  ];
  userInfo: {
    countryCode: string;
    socialAccounts?: [
      {
        platformSlug: string;
        platformUserIdentifier: string;
      }
    ];
  };
}

export const apexUsers = async (platform: string, query: string): Promise<ApexUser[]> => {
  const users = await axios.get(`http://localhost:8080/search/${platform}/${query}`);

  return users.data.data;
};

export const apexProfile = async (platform: string, username: string): Promise<ApexProfile> => {
  const profile = await axios.get(`http://localhost:8080/profile/${platform}/${username}`);

  console.log(profile.data.data);
  return profile.data.data;
};
