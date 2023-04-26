package com.falsy.authentication.config.security.siwe

import com.falsy.authentication.exception.UnauthorizedException
import com.falsy.authentication.model.entity.Account
import com.falsy.authentication.repository.AccountRepository
import com.moonstoneid.siwe.SiweMessage
import org.slf4j.LoggerFactory
import org.springframework.security.authentication.ReactiveAuthenticationManager
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono

/**
 * auth-service
 *
 * @author uuhnaut69
 *
 */
@Component
class SiweReactiveAuthenticationManager(
    private val accountRepository: AccountRepository
) : ReactiveAuthenticationManager {

    companion object {
        private val logger = LoggerFactory.getLogger(SiweReactiveAuthenticationManager::class.java)
    }

    override fun authenticate(authentication: Authentication): Mono<Authentication> {
        val credentials = authentication.credentials as SiweCredentials
        val account = authentication.principal as Account

        try {
            val siwe = SiweMessage.Parser().parse(credentials.message)
            siwe.verify(siwe.domain, account.nonce, credentials.signature)

            // Change nonce
            account.randomNonce()
            this.accountRepository.save(account)

            return Mono.just(SiweAuthenticationToken.authenticated(credentials, account))
        } catch (exception: Exception) {
            logger.error("Authenticated user ${account.address} failed with error ${exception.message}")
            throw UnauthorizedException(exception.message)
        }
    }

}