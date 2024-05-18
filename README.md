# ms-nathan-betest

## About

A simple user managament sample built with NodeJs, MongoDB and Redis

### Prerequisites

```
- nodejs, npm
- mongodb
- redis
- docker
```

### Installing and Running

A step by step series of examples that tell you how to get a development env running.

Running localy

```
- git clone this project
- setup your .env
- run on terminal
    - npm install
    - npm run dev
```

Running with docker

```
- docker network create betest-net
- docker compose up -d
- on folder kafka/ docker compose up -d
- setup your .env and docker-compose.yml environment
- run docker compose up
```

## Usage <a name = "usage"></a>

You can access the app using curl, postman or the documentation with swagger at /api-docs
![Screenshot from 2024-04-28 13-11-24](https://github.com/nathanngl/nathan-betest/assets/28669807/9441ea2f-cb68-46f0-a1c0-2b3f575c7cc8)

## Unit Test

```
npm run test
```
![Screenshot from 2024-04-28 13-16-57](https://github.com/nathanngl/nathan-betest/assets/28669807/f37a17e7-81fb-4fd6-ae9d-b4a2c1235019)
