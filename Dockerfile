FROM node:latest

ENV APP_HOME /newUI
WORKDIR $APP_HOME
COPY . $APP_HOME
