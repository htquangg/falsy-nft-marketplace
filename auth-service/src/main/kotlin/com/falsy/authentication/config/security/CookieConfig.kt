package com.falsy.authentication.config.security

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.ResponseCookie
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
    fun webSessionIdResolver(): WebSessionIdResolver {
        val resolver = CookieWebSessionIdResolver()
        resolver.cookieName = "sessionId"
        resolver.addCookieInitializer { builder: ResponseCookie.ResponseCookieBuilder ->
            builder.path(
                "/"
            )
        }
        resolver.addCookieInitializer { builder: ResponseCookie.ResponseCookieBuilder ->
            builder.sameSite(
                "Strict"
            )
        }
        return resolver
    }
}