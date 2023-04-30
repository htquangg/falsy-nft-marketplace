package com.falsy.account.service

import com.falsy.account.model.dto.VerifyAccountDto
import com.falsy.account.model.entity.Account
import com.falsy.account.repository.AccountRepository
import com.moonstoneid.siwe.SiweMessage
import kotlinx.coroutines.reactive.awaitFirstOrElse
import kotlinx.coroutines.reactor.awaitSingleOrNull
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono


/**
 * auth-service
 *
 * @author uuhnaut69
 *
 */
@Service
class AccountService(
    private val accountRepository: AccountRepository,
) {
    companion object {
        private val logger = LoggerFactory.getLogger(AccountService::class.java)
    }

    fun randomUserNonce(address: String): Mono<String> {
        return this.accountRepository.findByAddress(address)
            .switchIfEmpty(Mono.just(Account(address)))
            .doOnSuccess {
                it.randomNonce()
            }.flatMap { accountRepository.save(it) }
            .map { it.nonce }
    }

    suspend fun verifySignature(verifyAccountDto: VerifyAccountDto): String? {
        val (address, message, signature) = verifyAccountDto
        val account = this.accountRepository.findByAddress(address).awaitFirstOrElse { Account(address) }
        return try {
            val siwe = SiweMessage.Parser().parse(message)
            siwe.verify(siwe.domain, account.nonce, signature)

            logger.debug("Verified account ${verifyAccountDto.address} successfully")
            account.address
        } catch (exception: Exception) {
            logger.error("Verified account ${verifyAccountDto.address} failed with error ${exception.message}")
            null
        } finally {
            // Change nonce
            account.randomNonce()
            this.accountRepository.save(account).awaitSingleOrNull()
        }
    }

}
