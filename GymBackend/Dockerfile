

FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean install


FROM openjdk:17-alpine
WORKDIR /app
COPY --from=build /app/target/gym_backend-0.0.1-SNAPSHOT.jar ./gym_backend.jar
EXPOSE 8080
CMD ["java", "-jar", "gym_backend.jar"]