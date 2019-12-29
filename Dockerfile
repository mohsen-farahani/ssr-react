FROM keymetrics/pm2:latest-alpine

WORKDIR /usr/src/app

# Bundle APP files
COPY ./package.json .
COPY ./pm2.json .
COPY ./.env .

RUN npm i

COPY . .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn


EXPOSE 3000

RUN npm run build

# Show current folder structure in logs
# RUN ls -al -R

CMD [ "pm2-runtime", "start", "pm2.json" ]