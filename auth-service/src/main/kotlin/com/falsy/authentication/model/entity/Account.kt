package com.falsy.authentication.model.entity

import com.aventrix.jnanoid.jnanoid.NanoIdUtils
import com.falsy.authentication.model.core.BaseEntity
import org.springframework.data.relational.core.mapping.Table

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

    var nonce: String = ""

    fun randomNonce() {
        this.nonce = NanoIdUtils.randomNanoId(NanoIdUtils.DEFAULT_NUMBER_GENERATOR, NONCE_RULE, 21)
    }

    companion object {
        private val NONCE_RULE = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".toCharArray()
    }
}