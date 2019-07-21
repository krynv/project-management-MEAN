# Angular 2 Application for Project Management

[![Build Status](https://travis-ci.com/krynv/project-management-MEAN.svg?token=M3MdFm712J5BiykqssE8&branch=develop)](https://travis-ci.com/krynv/project-management-MEAN) 

You may need to have Python version 2.7 installed for the node-gyp dependency. 

Clone repo: 

    git clone git@github.com:krynv/project-management-mean.git && cd project-management-mean

Download dependencies: 

    npm i && npm i -g nodemon && npm i -g @angular/cli
    cd client/ && npm i

Start MongoDB:

    sudo mongod

In a separate tab: 

    mongo

Start express server: 

    npm start

Start client:

    cd client/ && npm start

Access API on port `1337`

Access Dev client on port `4200`
