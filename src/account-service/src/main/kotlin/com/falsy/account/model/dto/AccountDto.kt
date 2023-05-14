package com.falsy.account.model.dto

import com.falsy.account.model.entity.Role
import java.time.Instant

/**
 * falsy-nft-marketplace
 *
 * @author uuhnaut69
 *
 */
data class AccountDto(
    val address: String,
    val displayName: String,
    val avatarUrl: String,
    val coverUrl: String,
    val role: Role,
    val createdDate: Instant
)
