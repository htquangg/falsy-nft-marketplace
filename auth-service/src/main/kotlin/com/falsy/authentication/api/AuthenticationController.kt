package com.falsy.authentication.api

import com.falsy.authentication.model.core.Response
import com.falsy.authentication.model.dto.AuthenticationDto
import com.falsy.authentication.model.dto.ChallengeDto
import com.falsy.authentication.service.AuthenticationService
import io.swagger.v3.oas.annotations.Operation
import jakarta.validation.Valid
import kotlinx.coroutines.reactor.awaitSingleOrNull
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ServerWebExchange
import org.springframework.web.server.WebSession

/**
 * auth-service
 *
 * @author uuhnaut69
 *
 */
@RestController
@RequestMapping("/auth")
class AuthenticationController(private val authenticationService: AuthenticationService) {

    @Operation(
        summary = "Perform challenge nonce for authentication.",
        operationId = "challenge"
    )
    @PostMapping("/challenge")
    suspend fun challenge(@RequestBody @Valid challengeDto: ChallengeDto): Response<String> {
        val nonce = this.authenticationService.randomUserNonce(challengeDto.address).awaitSingleOrNull()
        return Response.ok(nonce)
    }

    @Operation(
        summary = "Perform login action.",
        operationId = "login",
    )
    @PostMapping("/login")
    suspend fun login(
        @RequestBody @Valid authenticationDto: AuthenticationDto,
        serverWebExchange: ServerWebExchange
    ): Response<Boolean> {
        val success = this.authenticationService.authenticate(authenticationDto, serverWebExchange)
        return Response.ok(success)
    }

    @Operation(
        summary = "Perform logout action.",
        operationId = "logout",
    )
    @PostMapping("/logout")
    suspend fun logout(webSession: WebSession): Response<Boolean> {
        webSession.invalidate().awaitSingleOrNull()
        return Response.ok(true)
    }

}