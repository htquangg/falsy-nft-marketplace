FROM ghcr.io/graalvm/graalvm-ce:22.3.2@sha256:f02b4eba4a841d60e525e0b0a9db76eed3bb813fd39774ee089f9a888aea3751 AS build

WORKDIR /opt/app

COPY --chown=nonroot:nonroot ./ .

RUN ./gradlew nativeCompile

FROM oraclelinux:9-slim@sha256:0e298f992c5fd7c6759b91a5c187f56d5c93d4ab9cd71b9fb266b763af95ae0d AS production

USER nonroot

COPY --chown=nonroot:nonroot --from=build /opt/app/build/native/nativeCompile/account-service account-service

CMD [ "sh", "-c", "./account-service" ]
