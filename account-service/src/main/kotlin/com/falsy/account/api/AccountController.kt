package com.falsy.account.api

import com.falsy.account.model.core.Response
import com.falsy.account.model.dto.ChallengeDto
import com.falsy.account.model.dto.VerifyAccountDto
import com.falsy.account.service.AccountService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.validation.Valid
import kotlinx.coroutines.reactor.awaitSingleOrNull
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

/**
 * auth-service
 *
 * @author uuhnaut69
 *
 */
@Tag(name = "accounts")
@RestController
@RequestMapping("/accounts")
class AccountController(private val accountService: AccountService) {

    @Operation(
        summary = "Perform challenge nonce for verifying account.",
        operationId = "challenge"
    )
    @PostMapping("/challenge")
    suspend fun challenge(@RequestBody @Valid challengeDto: ChallengeDto): Response<String> {
        val nonce = this.accountService.randomUserNonce(challengeDto.address).awaitSingleOrNull()
        return Response.ok(nonce)
    }

    @Operation(
        summary = "Perform verify account action.",
        operationId = "verifyAccount",
    )
    @PostMapping("/verify-account")
    suspend fun verifyAccount(
        @RequestBody @Valid verifyAccountDto: VerifyAccountDto,
    ): Response<String?> {
        val account = this.accountService.verifySignature(verifyAccountDto)
        return Response.ok(account)
    }

}
