FROM rustlang/rust:nightly@sha256:12474a3c3f91d34b34aa14a4efb28d2cd8a7a179e75c4521a0154be831219c61 AS build

WORKDIR /app/src
RUN USER=root cargo new --bin nft-service
COPY Cargo.toml Cargo.lock ./nft-service/

WORKDIR /app/src/nft-service
RUN cargo build --release

COPY --chown=rust:rust ./proto ./proto
COPY --chown=rust:rust ./src ./src
COPY --chown=rust:rust Cargo.toml Cargo.lock ./

RUN cargo build --release

FROM debian:stable-slim@sha256:f3f1c0c8558785f0f22ba60cfb3e7156f3dac3b7cb0474dfb97ca6b35ca86e32 AS production

WORKDIR /app

ENV APP_USER=rust

RUN groupadd $APP_USER \
    && useradd -g $APP_USER $APP_USER \
    && mkdir -p ${APP}

RUN apt update \
    && apt install -y --no-install-recommends openssl ca-certificates \
    && apt clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

EXPOSE 3333

COPY --chown=rust:rust --from=build /app/src/nft-service/target/release/nft-service /app/nft-service

CMD ["/app/nft-service"]
