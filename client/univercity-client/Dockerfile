FROM node:14 AS frontend-build
WORKDIR /app

# Copy dependency files first to leverage Docker layer caching
COPY . .

RUN npm install

RUN npm install -g serve

RUN npm run build

EXPOSE 3000

# Run application
#CMD [ "npm", "start" ]
CMD serve -s build