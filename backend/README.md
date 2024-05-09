# Backend Development

## Build & Run the Backend Application Manually


- Clone the repository and change directory

```bash
git clone

cd ./bounswe2024group11/backend
```

- Create a `.env` file in the `./backend` directory

```bash
cp .env.example .env
```

- Enter the values for the environment variables in the `.env` file.

You can take the credentials for the test/deployment environment by contacting with the contributors of this repo.
Or you can use your credentials for development purposes.


- You need to create a virtual environment and do all backend-related jobs inside that virtual environment.

```bash
# create a virtual environment

## On bash/zsh shells (i.e., on macOS and the most of the Linux-based distros)
python3 -m venv venv
## On Windows
python -m venv venv


# Activate the virtual environment

## On bash/zsh shells (i.e., on macOS and the most of the Linux-based distros)
source ./venv/bin/activate
## On Windows
venv\Scripts\Activate.ps1 (Powershell)
venv\Scripts\activate.bat (cmd)
```

While initializing our project, we decided to use Python 3.12. So create your virtual environments accordingly.
You may want to take a look at to the [Python Documentation](https://docs.python.org/3/library/venv.html).

### Installations

Before starting development, we need to install all the requirements. Be sure you've activated your virtual environment. Inside the `./backend` directory:

```bash
# Install requirements
pip install -r requirements.txt
```

> (Optional) If you want to use your local credentials, don't forget to migrate to the database

Run your MySQL server.

Then run the following commands to migrate to the database

```bash
python manage.py makemigrations
python manage.py migrate
```

### Run the app

To check if everything is okay, try to run the Django project. Inside the `./backend` directory:

```bash
# Run the Django project server
python manage.py runserver
```

If you see a page without an error when you visit the URL in the terminal, which is similar to `http://127.0.0.1:8000`, your server works properly.

Congratulations! You have cloned the project, created a virtual environment, and installed the dependencies. Now, you are ready to start your development!