FROM node:20
  
WORKDIR /usr/src/app


COPY --chown=node:node . .

RUN npm ci --production

ENV DEBUG=todo-backend:*
  

USER node

CMD npm start
