## Build & Run the Application

Below instructions cover dockerization & deployment process of our application for users who wants to test/use the application on their local environments. 

Please note that this guide covers this process in the context of **Customer Milestone 1**.

### Pre-Requisites

- Docker
- Docker-Compose

### Steps

Please follow this guide step by step in order to create a local build and run the application on the same environment.

#### Clone the Repository

- It is highly recommended to clone our repository on to the environment where the application is going to be built.

```bash
git clone https://github.com/bounswe/bounswe2024group11.git
cd ./bounswe2024group11
```
- To have the latest changes included, it is recommended to switch to the `development` branch.

```bash
git checkout development
```

#### Create `.env.dev` file

- Our application needs an `.env.dev` file to configure some settings inside its containers during the build process. Since our `.env.dev` file is not pushed to satisfy some security measures,
   users who wants to create the application locally have to create this file.
- Make sure that current directory is the root directory of repository. 
```bash
touch .env.dev
```
- Fill out the `.env.dev` file such as below.
```bash
MYSQL_ROOT_PASSWORD=example
MYSQL_USER=user
MYSQL_PASSWORD=password
DB_NAME=mydatabase
DB_HOST=db
DB_PORT=3306
ALLOWED_HOSTS=<IP_OF_YOUR_HOST_MACHINE>
VITE_ENABLE_MOCKS=true
VITE_LOGGING=true
```

#### Build & Run Using Docker-Compose

- After completing steps above, the host machine should be ready for docker builds. It is important to note that users need to install docker-compose program on top of docker itself.
It is also recommended to add docker-compose command to the $PATH if it is not configured so.

- It is important to use the `docker-compose.dev.yml` file for building the application. `-d` flag runs docker-compose in detached mode to not block the shell during the run.

- Below command is sufficient to build & run the application.

```bash
docker-compose -f docker-compose.dev.yml --build up -d
```
