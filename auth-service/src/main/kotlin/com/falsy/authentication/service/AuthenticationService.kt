package com.falsy.authentication.service

import com.falsy.authentication.config.security.siwe.SiweAuthenticationToken
import com.falsy.authentication.config.security.siwe.SiweReactiveAuthenticationManager
import com.falsy.authentication.config.security.siwe.SiweReactiveUserDetailsService
import com.falsy.authentication.model.dto.AuthenticationDto
import com.falsy.authentication.model.entity.Account
import com.falsy.authentication.repository.AccountRepository
import kotlinx.coroutines.reactor.awaitSingle
import org.slf4j.LoggerFactory
import org.springframework.security.core.context.SecurityContextImpl
import org.springframework.security.web.server.context.ServerSecurityContextRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.server.ServerWebExchange
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
    private val accountRepository: AccountRepository,
    private val siweReactiveUserDetailsService: SiweReactiveUserDetailsService,
    private val siweReactiveAuthenticationManager: SiweReactiveAuthenticationManager,
    private val serverSecurityContextRepository: ServerSecurityContextRepository
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

    suspend fun authenticate(authenticationDto: AuthenticationDto, serverWebExchange: ServerWebExchange): Boolean {
        return try {
            val (address, message, signature) = authenticationDto
            val userDetails = this.siweReactiveUserDetailsService.findByUsername(address).awaitSingle()

            val unAuthenticated = SiweAuthenticationToken.unAuthenticated(message, signature, userDetails)

            val authenticated = this.siweReactiveAuthenticationManager.authenticate(unAuthenticated).awaitSingle()

            this.serverSecurityContextRepository.save(serverWebExchange, SecurityContextImpl(authenticated))
                .awaitSingle()
            true
        } catch (exception: Exception) {
            logger.error(
                """Authenticated user ${authenticationDto.address} 
                failed with error ${exception.message} 
                and stack trace ${exception.stackTrace}""".trimIndent()
            )
            false
        }
    }

}