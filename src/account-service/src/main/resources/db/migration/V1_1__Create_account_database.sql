CREATE TABLE IF NOT EXISTS account
(
    address      VARCHAR(255) NOT NULL PRIMARY KEY,
    display_name VARCHAR(255)          DEFAULT NULL,
    avatar_url   VARCHAR(255)          DEFAULT NULL,
    cover_url    VARCHAR(255)          DEFAULT NULL,
    role         VARCHAR(50)           DEFAULT NULL,
    nonce        VARCHAR(255)          DEFAULT NULL,
    created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
