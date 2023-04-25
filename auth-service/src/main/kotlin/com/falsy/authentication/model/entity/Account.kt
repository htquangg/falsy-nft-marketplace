package com.falsy.authentication.model.entity

import com.aventrix.jnanoid.jnanoid.NanoIdUtils
import com.falsy.authentication.model.core.BaseEntity
import org.springframework.data.relational.core.mapping.Table
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

/**
 * auth-service
 *
 * @author uuhnaut69
 *
 */
@Table(value = "account")
class Account(val address: String) : BaseEntity(), UserDetails {

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

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return mutableListOf(SimpleGrantedAuthority(this.role.name))
    }

    override fun getPassword(): String {
        TODO("Not yet implemented")
    }

    override fun getUsername(): String {
        return this.address
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun isEnabled(): Boolean {
        return true
    }
}