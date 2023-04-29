CREATE KEYSPACE IF NOT EXISTS auth WITH replication = {'class':'NetworkTopologyStrategy', 'replication_factor':1}
                                    AND durable_writes = false;