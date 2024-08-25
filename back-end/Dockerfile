# Stage 1: Build the Java backend
FROM maven:3.8.4-openjdk-11 AS backend-build
WORKDIR /app
COPY . .
RUN mvn clean compile package

EXPOSE 8090

CMD ["java", "-jar", "target/univercity_ecosystem-1.0.jar"]