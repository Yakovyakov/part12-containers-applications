# The first FROM is now a stage called build-stage

FROM node:20 AS build-stage 

WORKDIR /usr/src/app

COPY . .

# In production we must change the value of the url to the public url relative to the reverse proxy
ENV VITE_BACKEND_URL="http://localhost:8080/graphql"
ENV VITE_BACKEND_URL="http://localhost:8080/subscriptions"

RUN npm ci

RUN npm run build

FROM nginx:1.25-alpine

# COPY the directory dist from the build-stage to /usr/share/nginx/html
# The target location here was found from the Docker hub page

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

