import { Logger } from '@tram/tram-common-logging';
import { runCron } from '@tram/tram-base-cron';
import {
  updateMaxTripTokenAllowedApplicationConfigurator,
  updateReferralTokensInApplicationConfigurator,
} from './clients/TokenClient';
import { updateTokensInUserFairPlayNoSQLRepository } from './repository/UpdateTokensRepository';

async function cronLogic() {
  Logger.info('Starting updating tokens in no sql once Job');
  try {
    // await Promise.allSettled([
    //   updateReferralTokensInApplicationConfigurator(),
    //   updateMaxTripTokenAllowedApplicationConfigurator(),
    //   updateTokensInUserFairPlayNoSQLRepository(),
    // ]);

    Logger.info('Successfully finished updating tokens run once job');
  } catch (exception) {
    Logger.error(`Error while updating tokens with error ${exception}`);
    throw new Error(`Error while updating tokens with error ${exception}`);
  }
  Logger.info('Successfully finished the token update in no sql once Job');
}

(async function () {
  await runCron(cronLogic);
})();
