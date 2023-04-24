package com.falsy.authentication.config.security

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.web.server.SecurityWebFilterChain
import org.springframework.security.web.server.context.WebSessionServerSecurityContextRepository

/**
 * auth-service
 *
 * @author uuhnaut69
 *
 */
@Configuration
@EnableWebFluxSecurity
@EnableReactiveMethodSecurity(useAuthorizationManager = true)
class SecurityConfig {

    @Bean
    fun webSessionSpringSecurityFilterChain(http: ServerHttpSecurity): SecurityWebFilterChain {

        http.csrf().disable()
        http.securityContextRepository(WebSessionServerSecurityContextRepository())

        http.authorizeExchange()
            .pathMatchers(HttpMethod.POST, "/auth/**")
            .permitAll()
            // Exclude public resources from the filter
            .pathMatchers(
                "/", "/csrf",
                "/v2/api-docs/**",
                "/v3/api-docs/**",
                "/v3/api-docs.yaml",
                "/swagger-resources/**",
                "/swagger-ui.html/**",
                "/swagger-ui/**",
                "/webjars/**",
            )
            .permitAll()
            .anyExchange().authenticated()
            .and()
            .httpBasic()
            .and()
            .formLogin()
            .disable()

        return http.build()
    }

}