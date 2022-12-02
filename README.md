# Clevernote

## Table of contents
1. [Project Summary](#project-summary)
2. [Technologies Used](#technologies-used)
3. [App Screenshots](#app-screenshots)
4. [Local Run Instructions](#local-run-instructions)
5. [Future Features](#future-features)

---
## Project Summary
Clevernote is fullstack, stateful web-app that draws functionality and style insperation from [evernote.com](https://evernote.com/). The current build of Clevernote offers two key features of interaction: notes and notebooks. Users are able to create notes and notebooks which hold those notes. Users can view all of their notes or notes specific to a single notebook.

[Check out the live site!](https://clevernote.onrender.com/)

---
## **Technologies Used**

### Backend:
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)

**| [WTForms](https://wtforms.readthedocs.io/en/3.0.x/) | [SQLAlchemy](https://www.sqlalchemy.org/) | [Alembic](https://alembic.sqlalchemy.org/en/latest/) |**

### Frontend:
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

---
## App Screenshots

### Splash Page
![](https://i.imgur.com/gADZsIC.png)


### Log In
![](https://i.imgur.com/8cNMKtT.png)


### Sign Up
![](https://i.imgur.com/rb2tkSF.png)


### Notes
![](https://i.imgur.com/jWHwm8h.png)


### Delete Note
![](https://i.imgur.com/XjGkJ1Z.png)


### Notebooks
![](https://i.imgur.com/1dNAvac.png)
### Create Notebook
![](https://i.imgur.com/moyUyQZ.png)
### Edit Notebook
![](https://i.imgur.com/WEjssXR.png)


### Delete Notebook
![](https://i.imgur.com/ggbVy5T.png)

---

## Local Run Instructions
1. Clone the repository to a local directory.
2. In the root directory, copy the contents of the `.env.example` to a `.env` file.
    - Assign `DATABASE_URL` to `sqlite:///dev.db`
    - Assign `SECRET_KEY` to anything (but keep it a secret!)
    - `SCHEMA` is only used for live deployments and can be set to anything
3. In `./app`, install the backend dependencies:
```
pipenv install
```
4. Still in `./app`, run the Alembic migration:
```
pipenv run flask db upgrade
```
5. Then, seed the database:
```
pipenv run flask seed all
```
6. Start the backend server:
```
pipenv run flask run
```
7. Navigate to `./react-app` and install the frontend dependencies:
```
npm install
```
8. Start the frontend server:
```
npm start
```
---

## Future Features
* Tasks:
	* Due dates
	* Assign tasks to other users
	* Interactive task inerface

* Home page with a summary of recent activity.

* Rich text editing support on notes.

* Note tags to help users find related notes.

* Note and notebook search functionality with filtering by tags, name/title, and created/updated dates.

* Support for media attachments on notes:
	* AWS3 integration to allow direct uploading of image and video files.
	* Media previews when uploading.
	* Support for notes with multiple media types and entries.

* Expanded user to user interaction capabilities:
	* View notes, notebooks, and tasks shared with you.
	* Share notes, notebooks, and tasks with others
