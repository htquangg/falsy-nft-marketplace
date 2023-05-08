use std::net::SocketAddr;

use axum::{
    http::StatusCode,
    Json,
    response::IntoResponse,
    Router, routing::{get, post},
};

#[tokio::main]
async fn main() {
    // initialize tracing
    tracing_subscriber::fmt::init();

    // build our application with a route
    let app = Router::new();

    // run our app with hyper, listening globally on port 3000
    axum::Server::bind(&"0.0.0.0:3333".parse().unwrap())
        .serve(app.into_make_service())
        .with_graceful_shutdown(signal_shutdown())
        .await
        .unwrap();
}

async fn signal_shutdown() {
    tokio::signal::ctrl_c()
        .await
        .expect("expect tokio signal ctrl-c");
}

