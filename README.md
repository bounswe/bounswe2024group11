# Boun SWE 2024 Group 11

<img width="1920" alt="Cover Image" src="https://github.com/bounswe/bounswe2024group11/assets/68506701/a45236b3-c0a7-42be-bbdf-0f9194ead0b5" />

## 📚 About the Repository

As a group of 10 passionate people, we are building a software project to grasp various aspects of OSS (Open Source Software), collaborative development, teamwork, project management, and as well as programming.
It's suggested to check the [Wiki](https://github.com/bounswe/bounswe2024group11/wiki)

## ⏳ Project Status

✅ Requirements + Project Planning

✅ Software Design & UI/UX Design

⏸️ Implementation

## 🌴 Project Structure

> Structure of the Web Part
├── web
├── public
|   ├──zenith-logo.png
|   ├──zenith-logo.svg
├── src
│   ├── components
│   │   ├── Button.tsx
│   │   ├── Checkmark.tsx
|   |   ├── ImageLink.tsx
|   |   ├── InfoBox.tsx
│   │   └── InlineLink.tsx
|   ├── context
│   |   └── UserContext.tsx
│   ├── lib
│   │   └── storage.ts
|   ├── routes
|   |   ├── Home.data.tsx
|   |   ├── Home.tsx
|   |   ├── Login.data.tsx
|   |   ├── Login.tsx
|   |   ├── Register.data.tsx
|   |   ├── Register.tsx
|   |   └── Terms.tsx
|   ├── schema
|   |   ├── search.ts
|   |   └── user.ts
|   ├── index.css
|   ├── main.tsx
|   ├── router.tsx
|   ├── theme.ts
│   └── vite-env.d.ts

## Build & Run the Application

You can follow this guide to run the whole application using Docker conainers.

Alternatively, if you want to run the backend, web, and mobile applications separately (i.e. without Docker), refer to their own READMEs.
- [Backend](https://github.com/bounswe/bounswe2024group11/blob/main/backend/README.md)
- [Web](https://github.com/bounswe/bounswe2024group11/blob/main/web/README.md)
- [Mobile](https://github.com/bounswe/bounswe2024group11/blob/main/mobile/README.md)

### Prerequisites

- Docker
  
### Steps

- Clone the repository and change directory

```bash
git clone

cd ./bounswe2024group11
```

- Create a `.env` file in the `./backend` and `./frontend` directories

```bash
cp backend/.env.example backend/.env
cp web/.env.example web/.env
```

- Enter the values for the environment variables in the `.env` file.

You can take the credentials for the test/deployment environment by contacting with the contributors of this repo.
Or you can use your credentials for development purposes.


- Install Docker and Docker Compose

    - [Docker](https://docs.docker.com/get-docker/)
    - [Docker Compose](https://docs.docker.com/compose/install/)

- Run the application

```bash
cd ..
# if your containers are already running, first stop them
docker-compose down

docker-compose build
docker-compose up
```

## 📜 License

> TBD

### 🧑🏼‍💻 Contributors

- [Arda Vural](https://github.com/bounswe/bounswe2024group11/wiki/Arda-Vural)
- [Ceydanur ŞEN](https://github.com/bounswe/bounswe2024group11/wiki/Ceydanur-%C5%9Een)
- [Emre Kılıç](https://github.com/bounswe/bounswe2024group11/wiki/Emre-Kılıç)
- [Hasan Kerem Şeker](https://github.com/bounswe/bounswe2024group11/wiki/Hasan-Kerem-%C5%9Eeker)
- [Muhammed Emin Arayıcı](https://github.com/bounswe/bounswe2024group11/wiki/Muhammed-Emin-Arayıcı)
- [Muhammet Emin Çiftçi](https://github.com/bounswe/bounswe2024group11/wiki/Muhammet-Emin-%C3%87ift%C3%A7i)
- [Mücahit Erdoğan Ünlü](https://github.com/bounswe/bounswe2024group11/wiki/M%C3%BCcahit-Erdo%C4%9Fan-%C3%9Cnl%C3%BC)
- [Ozan Oytun Karakaya](https://github.com/bounswe/bounswe2024group11/wiki/Ozan-Oytun-Karakaya)
- [Ümit Can Evleksiz](https://github.com/bounswe/bounswe2024group11/wiki/%C3%9Cmit-Can-Evleksiz)
- [Yunus Kağan Aydın](https://github.com/bounswe/bounswe2024group11/wiki/Yunus-Ka%C4%9Fan-Ayd%C4%B1n)

### ✨ Contributing

The contributions to this repo are maintained by issues within specific templates determined under `.github/ISSUE_TEMPLATE` directory. You will face a frontmatter upon pressing on the New Issue button. You can choose the template that fits your issue and fill the issue.

We do not have a PR template yet, but we plan to add one.
