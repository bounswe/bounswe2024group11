## Build & Run the Application

Below instructions cover dockerization & deployment process of our application for users who wants to test/use the application on their local environments.

Please note that this guide covers this process in the context of **Customer Milestone 2**.

### Pre-Requisites

- Docker
- Docker-Compose
- It is sufficient to have the Docker Desktop application for having both of these application above. You can access the necessary document [here](https://docs.docker.com/desktop/). 

### Steps

Please follow this guide step by step in order to create a local build and run the application on the same environment.

#### Clone the Repository

- It is highly recommended to clone our repository on to the environment where the application is going to be built. Then, simple change your directory into the root folder of our repository.

```bash
git clone https://github.com/bounswe/bounswe2024group11.git
cd ./bounswe2024group11
```

- To have the latest changes included, it is recommended to switch to the `main` branch.

```bash
git fetch
git checkout main
git pull
```

#### Create `.env` Files

- Our application needs an `.env` files to configure some settings inside its containers during the build process. Since `.env` files are ignored by `.gitignore`, it is required to have these files for local deployment.
- Make sure that current directory is the root directory of repository.

```bash
cp ./backend/.env.example ./backend/.env
cp ./client/.env.example ./client/.env
```

- You don't need to make any changes in environment variables since `.env.example` files since they are configured for local deployment.

#### Build & Run Using `docker-compose`

- After completing steps above, the host machine should be ready for docker builds. It is important to note that users need to install docker-compose program on top of docker itself. It is also recommended to add docker-compose command to the $PATH if it is not configured so.
- **It is highly recommended to have the Docker Desktop application installed for ignoring the step above.**

- It is important to use the `docker-compose.yml` file for building the application. `-d` flag runs docker-compose in detached mode to not block the shell during the run.

- Below command is sufficient to build & run the application. Make sure that your Docker Desktop application is running, since below command will require to docker daemon to be up & running.

```bash
docker-compose -f docker-compose.yml up --build -d
```
#### View the Running Application
- You can use Docker Desktop application for viewing running containers and their conditions.
- You can simply browse "http://localhost" for viewing the homepage of our client application for further use.

#### Closing the Running Application
- Again, Docker Desktop application is sufficient to stop or remove the built containers, images, builds and volumes.
- Or you can use the shell for this purpose.

```bash
docker ps # see running containers with their info
docker-compose down # stop running containers
docker images prune -a # remove all images built
```

#### Standards

In LAB-5, the team made significant efforts to document and adhere to the project's standards, namely WAI-ARIA, WCAG, and SVG.

Responsible individuals: Arda Vural, Hasan Kerem Seker, M. Emin Ciftci, Umit Can Evleksiz.
