CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS account
(
    id            UUID PRIMARY KEY             DEFAULT uuid_generate_v4(),
    address       VARCHAR(255) UNIQUE NOT NULL,
    display_name  VARCHAR(50)         NOT NULL DEFAULT 'UnNamed',
    "role"        VARCHAR(50)         NOT NULL,
    avatar_url    VARCHAR(255)                 DEFAULT NULL,
    cover_url     VARCHAR(255)                 DEFAULT NULL,
    nonce         VARCHAR(255)                 DEFAULT NULL,
    created_date  TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_date TIMESTAMP                    DEFAULT NULL
);