FROM node:latest

RUN mkdir /opportunities

ENV APP_HOME /opportunities

WORKDIR $APP_HOME

COPY . $APP_HOME
