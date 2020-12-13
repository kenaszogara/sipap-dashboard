FROM node:12

WORKDIR /app

COPY ./ /app  

RUN yarn install

EXPOSE 3000

# serve build folder
CMD yarn run build && yarn run start
