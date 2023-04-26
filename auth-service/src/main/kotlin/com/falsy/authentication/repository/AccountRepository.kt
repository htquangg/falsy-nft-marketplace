package com.falsy.authentication.repository

import com.falsy.authentication.model.entity.Account
import org.springframework.data.cassandra.repository.ReactiveCassandraRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Mono
import java.util.*

/**
 * auth-service
 *
 * @author uuhnaut69
 *
 */
@Repository
interface AccountRepository : ReactiveCassandraRepository<Account, UUID> {

    fun findByAddress(address: String): Mono<Account>
}