FROM node:18.20-bullseye-slim

ENV DockerHOME=/home/app/web

WORKDIR ${DockerHOME}

COPY package.json package-lock.json ./
RUN npm install

COPY . ${DockerHOME}

RUN npm run build

RUN npm install -g serve

EXPOSE 5173

CMD [ "serve", "-s", "build", "-l", "5173"]