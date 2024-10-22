# BASE IMAGE 
FROM python:3.12-slim-bullseye

ENV DIR=/home/app/backend
RUN mkdir -p ${DIR}
COPY . ${DIR}
WORKDIR ${DIR}

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y pkg-config python3-dev default-libmysqlclient-dev build-essential
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000
