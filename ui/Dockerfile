# base image
FROM node:12.13-alpine

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

COPY . /app

EXPOSE 3000
EXPOSE 35729

# start app
CMD ["npm", "start"]