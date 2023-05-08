package com.falsy.account.model.entity

import org.springframework.data.cassandra.core.cql.Ordering
import org.springframework.data.cassandra.core.cql.PrimaryKeyType
import org.springframework.data.cassandra.core.mapping.PrimaryKeyClass
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn
import java.time.Instant

/**
 * account-service
 *
 * @author uuhnaut69
 *
 */
@PrimaryKeyClass
class AccountEntityPrimaryKey(
    @PrimaryKeyColumn(
        type = PrimaryKeyType.PARTITIONED,
        ordinal = 0
    )
    val address: String
) {
    @PrimaryKeyColumn(
        type = PrimaryKeyType.CLUSTERED,
        ordinal = 1,
        ordering = Ordering.DESCENDING,
        name = "created_date"
    )
    var createdDate: Instant = Instant.now()
}
