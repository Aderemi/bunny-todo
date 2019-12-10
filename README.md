# React Todo App

This is a Todo app written in React, Node and docker micro-service project.

Check the demo hosted on a GCP Virtual Machine http://30.93.3.2/.


## Instructions

First clone this repository.
```bash
$ git clone https://github.com/aderemi/bunny-todo
```

Then run commands to bootstrap the database, migrate the tables,
install dependencies and start both backend and frontend Install their dependencies
with docker. Before running make sure you are having docker and docker-compose on 
your machine

```bash
$ cd bunny-todo
$ docker-compose up
```
This command may take some time because of images that have to be pulled by docker
and the speed of your internet will also take toll on the time it will take to complete.
As soon as it is completed run 
```bash
$ docker ps
```
Three containers should so up, for frontend, backend api and postgres database, this containers
encapsulate the microservices for each of the application parts. It is only postgres service that
has footprint, the remaining services implements 'shared-nothing' microservice architecture.

 
In this set up the each microservice is encapsulated in a docker containers.
Frontend, Backend and postgres database are running individually as a service 
on their different containers. 

The Frontend service is running at port 80 of http://30.93.3.2

The Backend service is running at port 8080 of http://30.93.3.2

While the PosgreSQL service is running on 5432 of http://30.93.3.2 but the service is not
exposed to the external world, is only accessible within the network.

##Improvements that should be done
- The frontend should be build into a folder served by a dedicated http server like apache or nginx
- The backend served by a http server
- The CI/CD is very simplistic and it can be largely improved, test coverage can be significantly 
improved while pipeline can be incorporated.
- The postgres service should be moved to a DBaaS to make the whole architecture "shared-nothing"
- Error reporting is available from the backend but not currently populated in the frontend
