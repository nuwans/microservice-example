# Microservice Project
The microservice project is a collection of small, independent services that work together to provide a larger application or system. Each service performs a specific function and communicates with other services through well-defined APIs. This architecture provides flexibility, scalability, and fault tolerance, as each service can be developed, deployed, and scaled independently.

### Used Technologies
- Nodejs
- MongoDB
- RabbitMQ
- NodeMailer
- Microservice
- ExpressJS
- Typescript
- Docker


### Architecture
 This service has two basic repos 
 
 ### `main-api` 
 This api listens for requests and return a empty response without waiting for other tasks to execute.
 1. App listens to POST request in `/` path with payload

        ```
        {"content":"This is email content","email":"valid email address"}
        ```
 2. Add payload to a asynchronous queue to execute without waiting for execute
 3. Send Response

### `queue-api` 
1. Listen to the previous queue using RabbitMQ.
2. Send content to email address.
3. Save in database.
 

### Set up guide
To set up the microservice project, follow these steps:

Clone the repository to your local machine.

1. To install dependancies in main-api  
    ``` cd main-api
        yarn install
        yarn build
    ```
    (if you want to run in development mode run )
    ``` yarn dev:start ```
2. To install dependancies in queue-api  
    ``` cd queue-api
        yarn install
        yarn build
    ```
    (if you want to run in development mode run )
    ``` yarn dev:start ```
3. After installing dependancies you can deploy these apis to docker container but first make sure Docker instaled in your computer
    to run both api in one command
    run ``` docker-compose -f docker-compose.yml   up --build ```

