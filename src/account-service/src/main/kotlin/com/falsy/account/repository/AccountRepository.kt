package com.falsy.account.repository

import com.falsy.account.model.entity.AccountEntity
import org.springframework.data.r2dbc.repository.R2dbcRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Mono

/**
 * auth-service
 *
 * @author uuhnaut69
 *
 */
@Repository
interface AccountRepository : R2dbcRepository<AccountEntity, String> {

    fun findByAddress(address: String): Mono<AccountEntity>

}
