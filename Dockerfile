# Start your image with a node base image
FROM node:20-bullseye   
# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./

# Copy local directories to the current local directory of our docker image (/app)
COPY ./es2015 ./es2015



# Install node packages, install serve, build the app, and remove dependencies at the end
RUN npm install \
    && npm install -g serve \ 
    && npm install --g bower 
RUN bower install traceur --allow-root 
RUN npm install -g jspm-server

COPY ./jspm_packages ./jspm_packages
COPY ./node_modules ./node_modules

EXPOSE 3000

# Start the app using serve command
CMD [ "serve" ]
