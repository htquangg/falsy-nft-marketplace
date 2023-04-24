package com.falsy.authentication.model.entity

import com.falsy.authentication.model.core.BaseEntity
import org.springframework.data.relational.core.mapping.Table
import java.util.*

/**
 * auth-service
 *
 * @author uuhnaut69
 *
 */
@Table(value = "account")
class Account(val address: String) : BaseEntity() {

    var displayName: String? = null

    var avatarUrl: String? = null

    var coverUrl: String? = null

    var role: Role = Role.ROLE_USER

    var nonce: String = UUID.randomUUID().toString()

    fun randomNonce() {
        this.nonce = UUID.randomUUID().toString()
    }
}