FROM node:lts AS development

WORKDIR /code
#Copy package json so we can get a clean set of node_modules
COPY package.json /code/package.json

#Install the modules
RUN npm install

#Copy everything in this folder
COPY . /code

FROM development AS buildNPM

#Make production build
RUN npm run build

#Alpine as its a slim package
FROM nginx:1.13-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf

#Copy the build into the nginx folder. From here it can be served
COPY --from=buildNPM /code/build /usr/share/nginx/html

EXPOSE 80