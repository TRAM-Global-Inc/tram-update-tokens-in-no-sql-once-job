# TRAM Template Run Once Job

A Kubernetes job template that is meant to run once

## Local Setup

1. Ensure you have GIT installed locally.
2. Ensure you have Node 16.15.1 LTS installed
3. Ensure you have Brew installed (for MacOS only)
4. Clone the repository with the following command: `git clone https://github.com/tram-global-inc/tram-template-run-once-job.git`
5. Navigate to the newly cloned repository
6. Authenticate against Google Cloud with `npm run ar-login`
7. Install dependencies with `npm install`
8. Start the app with `npm run dev`

## Building Docker & Running Image

1. Ensure you have Docker Desktop installed and running
2. CD to the root of the `tram-template-run-once-job` directory
3. Execute the following command in terminal:
```shell
        gcloud auth print-access-token --impersonate-service-account \
        artifact-registry-reader@tram-dev-environment-global.iam.gserviceaccount.com > access_token
```
4. Run the following in your terminal: `docker build -t tram-template-run-once-job-docker --build-arg TOKEN=$(cat access_token) .`
5. Run the following in your terminal: `docker run -p 3000:3000 tram-template-run-once-job-docker`

## Implementing Cron Logic

Once you've either set yourself up for local development update the `cronLogic` method in the app.ts file with the logic
you want your cron to execute.

## Scheduling

In order to set how often this cronjob will run in our Kubernetes cluster, update the `schedule` property in the dev and
prod deployment yamls with the desired cron frequency.

## Environment File

This cronjob uses environment variables instantiated via its deployment yaml to function. When running locally
create a `.env` file with the following content:

```json
LOG_LEVEL=debug
APP_NAME=tram-template-run-once-job
API_KEY=API_KEY_HERE
```
## Notes

### Hot Reload with Nodemon

This cronjob has been instrumented with Nodemon when running in DEV mode which will trigger a re-compile and re-run.

## Tips

### Switching Node Versions

If you're actively developing against multiple versions of Node it
can be useful to install Node Version Manager (referred to as NVM).
This can be found at the following site: https://github.com/nvm-sh/nvm

## Available Packages
TRAM cronjobs all inherit from the `tram-base-cron` npm package in order to make wiring up TRAM as easy as possible. 
As a result of this it may not be obvious exactly what packages you've got available to you for use when buidling
cronjobs based on this base code. Below is a listing of all dependencies you'll get transitively as a result of using 
the `tram-base-cron`:

```json
    "@tram/tram-common-logging": "^9.0.0",
    "@tram/tram-common-monitoring": "^1.0.11",
    "@tram/tram-common-utils": "^1.0.0",
    "typescript": "^4.7.4"
```
### A Note On Dependencies
As you'll see, updating these dependencies is intentionally frictionful as making changes to the base of cronjobs should not
be done lightly and instead should require careful thought.
