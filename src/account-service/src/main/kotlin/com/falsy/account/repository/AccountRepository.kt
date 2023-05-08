package com.falsy.account.repository

import com.falsy.account.model.entity.AccountEntity
import com.falsy.account.model.entity.AccountEntityPrimaryKey
import org.springframework.data.cassandra.repository.ReactiveCassandraRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Mono

/**
 * auth-service
 *
 * @author uuhnaut69
 *
 */
@Repository
interface AccountRepository : ReactiveCassandraRepository<AccountEntity, AccountEntityPrimaryKey> {

    fun findByAccountPrimaryKeyAddress(address: String): Mono<AccountEntity>
}
