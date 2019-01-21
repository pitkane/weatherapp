FROM node:latest

# if needed ;)
# RUN apt-get update
# RUN apt-get install -y vim

# create app directory in container
RUN mkdir -p /app

# http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json
RUN cd /tmp && npm ci --silent
RUN mkdir -p /app && mv /tmp/node_modules /app/

WORKDIR /app

COPY . /app

EXPOSE 8000

CMD ["npm", "start"]
