FROM node:18.20-bullseye-slim

ENV DockerHOME=/home/app/client

WORKDIR ${DockerHOME}

RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml ./

ENV PNPM_HOME=/root/.pnpm
ENV PATH=$PNPM_HOME:$PATH

RUN pnpm install

COPY . ${DockerHOME}

RUN pnpm run build

RUN pnpm install -g serve

EXPOSE 3310