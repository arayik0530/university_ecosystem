# Stage 1: Build the Java backend
FROM maven:3.8.4-openjdk-11 AS backend-build
WORKDIR /app
COPY back-end/pom.xml .
COPY back-end/src ./src
RUN mvn clean package

# Stage 2: Build the React frontend
FROM node:14 AS frontend-build
WORKDIR /app

# Copy dependency files first to leverage Docker layer caching
COPY client/univercity-client/package.json .
COPY client/univercity-client/package-lock.json .
RUN npm install

RUN npm install -g serve

# Print the value of PATH environment variable
RUN echo "PATH=$PATH"

# Now copy the rest of the client files
COPY client/univercity-client/ .
RUN npm run build

# Stage 3: Final image
FROM openjdk:11
WORKDIR /app

# Copy the built JAR file from the backend build stage
COPY --from=backend-build /app/target/univercity_ecosystem-1.0.jar app.jar

# Copy the built frontend files from the frontend build stage
COPY --from=frontend-build /app/build ./build

EXPOSE 8090
EXPOSE 3000

COPY start.sh /start.sh

CMD ["/bin/sh", "/start.sh"]

