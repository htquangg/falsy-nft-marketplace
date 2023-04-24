package com.falsy.authentication.config.security

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.session.ReactiveMapSessionRepository
import org.springframework.session.ReactiveSessionRepository
import org.springframework.session.config.annotation.web.server.EnableSpringWebSession
import java.util.concurrent.ConcurrentHashMap


/**
 * auth-service
 *
 * @author uuhnaut69
 *
 */
@Configuration
@EnableSpringWebSession
class SessionStorageConfig {

    @Bean
    fun reactiveSessionRepository(): ReactiveSessionRepository<*> {
        return ReactiveMapSessionRepository(ConcurrentHashMap())
    }

}