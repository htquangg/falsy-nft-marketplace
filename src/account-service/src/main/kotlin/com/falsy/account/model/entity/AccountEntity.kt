package com.falsy.account.model.entity

import com.aventrix.jnanoid.jnanoid.NanoIdUtils
import org.springframework.data.annotation.Id
import org.springframework.data.domain.Persistable
import org.springframework.data.relational.core.mapping.Column
import org.springframework.data.relational.core.mapping.Table
import java.time.Instant
import java.util.*

/**
 * auth-service
 *
 * @author uuhnaut69
 *
 */
@Table(value = "account")
class AccountEntity(
    @Id
    val address: String,
) : Persistable<String> {

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

    @Column(value = "created_at")
    var createdAt: Instant? = null

    @Column(value = "modified_at")
    var modifiedAt: Instant? = null

    fun randomNonce() {
        this.nonce = NanoIdUtils.randomNanoId(NanoIdUtils.DEFAULT_NUMBER_GENERATOR, NONCE_RULE, 21)
    }

    companion object {
        private val NONCE_RULE =
            "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".toCharArray()

        fun newAccount(address: String): AccountEntity {
            return AccountEntity(
                address,
            )
        }
    }

    override fun isNew() = this.address.isNotEmpty() && Objects.isNull(this.createdAt)

    override fun getId() = this.address

}
