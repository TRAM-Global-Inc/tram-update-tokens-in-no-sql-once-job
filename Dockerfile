FROM us-docker.pkg.dev/tram-dev-environment-global/tram-docker-base/tram-docker-base-1.0:latest

WORKDIR /srv/app

USER root

COPY .npmrc .npmrc

COPY package.json package.json

ARG TOKEN

RUN echo "//us-npm.pkg.dev/tram-dev-environment-global/:_authToken=\"$TOKEN\"" >> .npmrc

RUN npm install

COPY . .

RUN npm run build

USER tramuser

CMD ["node", "dist/app.js"]
