import { Logger } from '@tram/tram-common-logging';
import db from '../Firebase';

export const updateTokensInUserFairPlayNoSQLRepository = async () => {
  Logger.info(
    `Repository: starting token update in user fairplay subcollection`
  );

  try {
    const fairplaySnapshot = await db.collectionGroup('fairplays').get();
    const fairplays: any[] = [];
    fairplaySnapshot.forEach((doc) => {
      fairplays.push({ ...doc.data(), userId: doc?.ref?.parent?.parent?.id });
    });
    for (const fairplay of fairplays) {
      if (fairplay.userId && fairplay.fair_play_id) {
        await db
          .doc(`users/${fairplay.userId}/fairplays/${fairplay.fair_play_id}`)
          .update({
            tokens_transferred: fairplay.tokens_transferred / 1000,
          });
      }
    }
    Logger.info(
      `Repository: Successfully updated tokens for fairplays inside all users`
    );
  } catch (error) {
    Logger.error(`Repository: Error while updating tokens for fairplays`);

    throw new Error(
      `Error while updating tokens for fairplays in all users with error: ${error}`
    );
  }
};
