package com.falsy.account.model.entity

import com.aventrix.jnanoid.jnanoid.NanoIdUtils
import org.springframework.data.cassandra.core.cql.PrimaryKeyType
import org.springframework.data.cassandra.core.mapping.Column
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn
import org.springframework.data.cassandra.core.mapping.Table
import java.time.Instant

/**
 * auth-service
 *
 * @author uuhnaut69
 *
 */
@Table(value = "account")
class Account(
    @PrimaryKeyColumn(
        type = PrimaryKeyType.PARTITIONED
    ) val address: String
) {

    @Column(value = "display_name")
    var displayName: String? = null

    @Column(value = "avatar_url")
    var avatarUrl: String? = null

    @Column(value = "cover_url")
    var coverUrl: String? = null

    @Column(value = "role")
    var role: Role = Role.ROLE_USER

    @Column(value = "nonce")
    var nonce: String = ""

    @Column(value = "created_date")
    var createdDate: Instant = Instant.now()

    @Column(value = "modified_date")
    var modifiedDate: Instant = Instant.now()

    fun randomNonce() {
        this.nonce = NanoIdUtils.randomNanoId(NanoIdUtils.DEFAULT_NUMBER_GENERATOR, NONCE_RULE, 21)
    }

    companion object {
        private val NONCE_RULE = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".toCharArray()
    }

}
