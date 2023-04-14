import { Logger } from "@tram/tram-common-logging";
import { runCron } from "@tram/tram-base-cron";
import db from "./Firebase"


async function cronLogic(){
    Logger.info('Starting Run Once Job');

    Logger.info('Successfully finished Run Once Job');
}

(async function() {
    await runCron(cronLogic);
})()
