# base image  
FROM python:3.12-slim-bullseye
# setup environment variable  
ENV DockerHOME=/home/app/backend  

# set work directory  
RUN mkdir -p $DockerHOME  

# where your code lives  
WORKDIR $DockerHOME  

# set environment variables  
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1  

# install dependencies for mysqlclient
RUN apt-get update && apt-get install -y pkg-config python3-dev default-libmysqlclient-dev build-essential

# install dependencies  
RUN pip install --upgrade pip  

# copy whole project to your docker home directory. 
COPY . $DockerHOME  
# run this command to install all dependencies  
RUN pip install --no-cache-dir -r requirements.txt  
# port where the Django app runs  
EXPOSE 8000
# start server  
CMD python manage.py runserver