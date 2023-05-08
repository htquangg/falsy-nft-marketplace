FROM eclipse-temurin:19-alpine AS build

WORKDIR /opt/app

COPY --chown=user:user . .

RUN ./gradlew clean build -x test

USER user

FROM eclipse-temurin:19-alpine AS production

COPY --chown=user:user --from=build /opt/app/build/libs/*.jar app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]