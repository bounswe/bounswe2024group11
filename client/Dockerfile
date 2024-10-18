FROM node:18.20-bullseye-slim

ENV DockerHOME=/home/app/client

WORKDIR ${DockerHOME}

COPY package.json pnpm-lock.yaml ./
RUN npm install

COPY . ${DockerHOME}

RUN npm run build

RUN npm install -g serve

EXPOSE 3310

CMD [ "serve", "-s", "build", "-l", "3310"]