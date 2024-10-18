FROM node:18.20-bullseye-slim

ENV DockerHOME=/home/app/client

WORKDIR ${DockerHOME}

RUN npm i -g pnpm
# RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -

COPY package.json pnpm-lock.yaml ./

# Set environment variables to fix pnpm global bin installation issues
ENV PNPM_HOME=/root/.pnpm
ENV PATH=$PNPM_HOME:$PATH

RUN pnpm install

COPY . ${DockerHOME}

RUN pnpm run build

RUN pnpm install -g serve

EXPOSE 3310

CMD [ "serve", "-s", "build", "-l", "3310"]