FROM eclipse-temurin:19-alpine@sha256:7e4fc4b3ae1bd8ed4205bfd76e4ebeefca3904653f8ee3ba6ac2427cc28b03c9 AS build

WORKDIR /opt/app

COPY --chown=user:user . .

RUN ./gradlew clean build -x test

USER user

FROM eclipse-temurin:19-alpine@sha256:7e4fc4b3ae1bd8ed4205bfd76e4ebeefca3904653f8ee3ba6ac2427cc28b03c9 AS production

COPY --chown=user:user --from=build /opt/app/build/libs/*.jar app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]