# werkstukDEV5

# What does this project do
This  projest is used to organize games at home.

# Why is this useful
To keep a overview of what gams you have in home.

# How to start
Download or clone my repo. open the integrated terminal of where the docker-compose.yml file is located. In the terminal enter the following command: 
```sh
docker compose up --build
```
When the code is enterd everything will be setup and the api should be up and running.

# Endpoints
Open http://localhost:3000/ in webbrowser

> Note: if endpoind contains forms of ':name-:img-:catid' then way of input should look like this: 'monopoly-https://imgur.com/gallery/PDuZJGE-2'

Create:

| link | Function |
| ------ | ------ |
| http://localhost:3000/insertGame/:name-:img-:catid | creates new game |
| http://localhost:3000/insertCategorie/:cat | creates new categorie |


Read:

| link | Function |
| ------ | ------ |
| http://localhost:3000/getAllGames | lets you se all games |
| http://localhost:3000/getAllCategories | lets you se all categories |


Update:

| link | Function |
| ------ | ------ |
| http://localhost:3000/updateNameOnID/:gameId-:newName | updates name of game on given ID |


Delete:

| link | Function |
| ------ | ------ |
| http://localhost:3000/deleteOnID/:gameId | deletes game on given ID |


# Where to find help
The creator has moved on to new projects. 

# Authors
This project was created by Jérémy Gobert.

