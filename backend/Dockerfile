# base image
FROM node:latest

# set working directory
RUN mkdir /app
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm ci --silent

COPY . /app

# by default expose 9000
EXPOSE 9000

# start app
CMD ["npm", "run", "dev"]
