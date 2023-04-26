package com.falsy.authentication.config.security

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.env.Environment
import org.springframework.web.server.session.CookieWebSessionIdResolver
import org.springframework.web.server.session.WebSessionIdResolver


/**
 * auth-service
 *
 * @author uuhnaut69
 *
 */
@Configuration
class CookieConfig {

    @Bean
    fun webSessionIdResolver(environment: Environment): WebSessionIdResolver {
        val isProd = environment.activeProfiles.contains("prod")
        val resolver = CookieWebSessionIdResolver()
        resolver.cookieName = "JSESSIONID"
        resolver.addCookieInitializer {
            it.path(
                "/"
            )
            it.sameSite(
                "Strict"
            )
            it.httpOnly(isProd)
            it.secure(isProd)
        }
        return resolver
    }
}