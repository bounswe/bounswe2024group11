## Prerequisites
* Have Python installed

## 1. Create Venv
* Navigate to `backend` folder.
* Type `$ python -m venv venv` on console.
#### On windows powershell,
* Type `$ .\venv\Scripts\activate` to activate virtual environment
#### On Linux
* Type `$ source venv/bin/activate` to activate virtual environment

## 2. Install Requirements
* _After activating venv_ install requirements by `$ pip install -r requirements.txt`

## 3. Migrate the models
* Type `$ python manage.py migrate`

## 4. Run the Unit Tests
* Type `$ python manage.py test core.tests`

## 5. Run the App
* Type `$ python manage.py runserver`