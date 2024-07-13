

FROM maven:3.9.8-amazoncorretto-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package


FROM amazoncorretto:21
WORKDIR /app
COPY --from=build /app/target/gym_backend-0.0.1-SNAPSHOT.jar ./gym_backend.jar
EXPOSE 8081
CMD ["java", "-jar", "gym_backend.jar"]