package com.falsy.authentication.model.dto

import jakarta.validation.constraints.NotBlank

/**
 * auth-service
 *
 * @author uuhnaut69
 *
 */
data class ChallengeDto(@NotBlank(message = "Address can not blank") val address: String)
