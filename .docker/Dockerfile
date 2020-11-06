FROM node:12

WORKDIR /app

COPY ./ /app 

RUN npm install

RUN npm install -g serve

EXPOSE 3000

# build app
CMD ["yarn", "build"]

# serve build folder
CMD ["serve", "-s", "build", "--listen", "3000"]
