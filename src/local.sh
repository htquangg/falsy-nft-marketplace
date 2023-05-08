#!/bin/bash
docker compose down -v

docker compose up -d

CREATE_CQL="CREATE KEYSPACE IF NOT EXISTS account_keyspace WITH REPLICATION = {'class': 'NetworkTopologyStrategy', 'replication_factor': 1};"
echo "Executing: $CREATE_CQL"

sleep 300

docker exec account-database bin/bash cqlsh -e "$CREATE_CQL";
