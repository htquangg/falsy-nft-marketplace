package com.falsy.authentication.config.security.siwe

import com.falsy.authentication.exception.UnauthorizedException
import com.falsy.authentication.repository.AccountRepository
import org.springframework.security.core.userdetails.ReactiveUserDetailsService
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono

/**
 * auth-service
 *
 * @author uuhnaut69
 *
 */
@Component
class SiweReactiveUserDetailsService(
    private val accountRepository: AccountRepository
) : ReactiveUserDetailsService {

    override fun findByUsername(username: String): Mono<UserDetails> {
        return this.accountRepository.findByAddress(username)
            .switchIfEmpty(Mono.error(UnauthorizedException("User $username not found!")))
            .map { it as UserDetails }
    }
}