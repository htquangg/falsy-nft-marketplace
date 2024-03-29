package com.falsy.account.model.dto

import jakarta.validation.constraints.NotBlank

/**
 * auth-service
 *
 * @author uuhnaut69
 *
 */
data class VerifyAccountDto(
    @NotBlank(message = "Address can not blank") val address: String,
    @NotBlank(message = "Message can not blank") val message: String,
    @NotBlank(message = "Signature can not blank") val signature: String
)
