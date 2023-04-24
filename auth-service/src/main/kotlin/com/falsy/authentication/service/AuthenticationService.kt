package com.falsy.authentication.service

import com.falsy.authentication.model.dto.AuthenticationDto
import com.falsy.authentication.model.entity.Account
import com.falsy.authentication.repository.AccountRepository
import com.moonstoneid.siwe.SiweMessage
import com.moonstoneid.siwe.error.SiweException
import kotlinx.coroutines.reactive.awaitFirstOrElse
import kotlinx.coroutines.reactor.awaitSingle
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import reactor.core.publisher.Mono


/**
 * auth-service
 *
 * @author uuhnaut69
 *
 */
@Service
@Transactional
class AuthenticationService(
    val accountRepository: AccountRepository
) {
    companion object {
        private val logger = LoggerFactory.getLogger(AuthenticationService::class.java)
    }

    fun randomUserNonce(address: String): Mono<String> {
        return this.accountRepository.findByAddress(address)
            .switchIfEmpty(Mono.just(Account(address)))
            .doOnSuccess {
                it.randomNonce()
            }.flatMap { accountRepository.save(it) }
            .map { it.nonce }
    }

    suspend fun authenticate(authenticationDto: AuthenticationDto): Boolean {
        val (address, message, signature) = authenticationDto
        val account = this.accountRepository.findByAddress(address).awaitFirstOrElse { Account(address) }
        return try {
            val siwe = SiweMessage.Parser().parse(message)
            siwe.verify(siwe.domain, account.nonce, signature)
            logger.info("Authenticate user ${authenticationDto.address} success")
            true
        } catch (ex: SiweException) {
            logger.error("Authenticate user ${authenticationDto.address} failure with error ${ex.errorType}")
            false
        } finally {
            // Change nonce when authenticate
            account.randomNonce()
            this.accountRepository.save(account).awaitSingle()
        }
    }

}