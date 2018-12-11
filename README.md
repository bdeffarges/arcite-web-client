# ARCITE Web Client
Web client for ARCITE. Allows to search and manage experiments in ARCITE.

## Technology
ARCITE Web uses React in combination with Redux.

## Building
### Install Yarn
To build the project, you need [yarn](https://yarnpkg.com/).
```
	> npm install -g yarn
```

### Build project
Clone the repository and install dependencies
```
	> git clone <CLONE_URL>
	> cd arcite-webclient
	> yarn install
	> npm run build
```

### Run project
ARCITE Web can be run locally on a development server (http://localhost:8080) by running:
```
	> npm run start
```

Alternatively, you can run the production version locally. This will start a node/express server running on port 3000:
```
	> npm run run-prod
```

### Docker
ARCITE Web can be build as a Docker container:
```
	> docker build -t idorsia/arcite-web .
	> docker images
```
Afterwards, you can start the docker container:
```
	> docker run -p 32123:3000 --name 'arcite-web' -d idorsia/arcite-web
	> docker ps
```
ARCITE Web is now accessible (after a few seconds) under http://localhost:32123.
Once you are done you can stop and optionally remove the container again.
```
	> docker stop arcite-web
	> docker rm arcite-web # Optional
```

The original Arcite web client has been written by Tobias Fink. 