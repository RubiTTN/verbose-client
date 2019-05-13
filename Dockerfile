FROM node:10.15.1-alpine
WORKDIR '/app'
COPY ./package.json ./
RUN yarn
COPY . .
RUN yarn build
EXPOSE 3003
CMD ["yarn", "start"]
