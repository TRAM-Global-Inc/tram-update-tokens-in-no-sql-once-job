import { getTramApiAuthClient } from '@tram/tram-common-api-client';
import { Logger } from '@tram/tram-common-logging';
import { getEnvironmentVariable } from '@tram/tram-common-utils';

const TOKENS_PER_REFERRAL = parseFloat(
  getEnvironmentVariable('TOKENS_PER_REFERRAL')
);
const MAX_TRIP_TOKEN_ALLOWED = parseFloat(
  getEnvironmentVariable('MAX_TRIP_TOKEN_ALLOWED')
);

const API_KEY = getEnvironmentVariable('API_KEY');
const BASE_URL = getEnvironmentVariable('API_BASE_URL');
const tokenizationClient = getTramApiAuthClient(BASE_URL);

export const updateApplicationConfigurations = async (
  name: string,
  value: number
) => {
  Logger.info(
    `TokenClient: Request to ${name} application configurator with value of ${value}`
  );

  try {
    await tokenizationClient.patch(
      '/v1/configurator',
      {
        field_name: name,
        field_value: value,
      },
      {
        headers: { 'x-tram-api-key': API_KEY },
      }
    );
  } catch (error) {
    Logger.error(
      `TokenClient: Error while updating ${name} application configurator with value of ${value} with error: ${error}`
    );
    throw new Error(
      `TokenClient: Error while updating ${name} application configurator with value of ${value} with error: ${error}`
    );
  }
};

export const updateReferralTokensInApplicationConfigurator = async () => {
  Logger.info(
    `TokenClient: Request to update referral tokens in application configurator`
  );
  await updateApplicationConfigurations(
    'tokens_per_referral',
    TOKENS_PER_REFERRAL
  );
};

export const updateMaxTripTokenAllowedApplicationConfigurator = async () => {
  Logger.info(
    `TokenClient: Request to update max trip token allowed in application configurator`
  );
  await updateApplicationConfigurations(
    'max_trip_token_allowed',
    MAX_TRIP_TOKEN_ALLOWED
  );
};
