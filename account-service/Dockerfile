FROM eclipse-temurin:17.0.7_7-jdk-alpine@sha256:ad135147f78ddb330275438075a7177aaf9408f62d6b97ad2ecb6e66c1adc7b9
VOLUME /tmp
ARG JAR_FILE=/build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","${JAVA_OPTS}","-jar","/app.jar"]
