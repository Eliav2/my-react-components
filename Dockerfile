FROM node:18.14.0-bullseye


RUN apt update -y
RUN npm i -g pnpm:8