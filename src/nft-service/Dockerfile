FROM rustlang/rust:nightly AS build

WORKDIR /app/src
RUN USER=root cargo new --bin nft-service
COPY Cargo.toml Cargo.lock ./nft-service/

WORKDIR /app/src/nft-service
RUN cargo build --release

COPY --chown=rust:rust ./proto ./proto
COPY --chown=rust:rust ./src ./src
COPY --chown=rust:rust Cargo.toml Cargo.lock ./

RUN cargo build --release

FROM debian:stable-slim AS production

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
