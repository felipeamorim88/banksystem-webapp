FROM node

ENV HOME=/home/app

RUN apt-get update && apt-get install htop -y

COPY package.json package-lock.json $HOME/react_docker/

WORKDIR $HOME/react_docker

RUN npm install --silent --progress=false

COPY . $HOME/react_docker

EXPOSE 3001
CMD ["npm", "start"]