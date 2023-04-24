package com.falsy.authentication.repository

import com.falsy.authentication.model.entity.Account
import org.springframework.data.r2dbc.repository.R2dbcRepository
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
interface AccountRepository : R2dbcRepository<Account, UUID> {

    fun findByAddress(address: String): Mono<Account>
}