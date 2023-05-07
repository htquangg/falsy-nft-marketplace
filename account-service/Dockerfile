FROM ghcr.io/graalvm/graalvm-ce:22.3.1 AS build

WORKDIR /opt/app

COPY --chown=nonroot:nonroot ./ .

RUN ./gradlew nativeCompile

FROM oraclelinux:9-slim AS production

USER nonroot

COPY --chown=nonroot:nonroot --from=build /opt/app/build/native/nativeCompile/account-service account-service

CMD [ "sh", "-c", "./account-service" ]
