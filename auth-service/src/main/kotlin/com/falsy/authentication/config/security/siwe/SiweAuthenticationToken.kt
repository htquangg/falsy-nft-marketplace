package com.falsy.authentication.config.security.siwe

import org.springframework.security.authentication.AbstractAuthenticationToken
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import java.io.Serializable

/**
 * auth-service
 *
 * @author uuhnaut69
 *
 */
class SiweAuthenticationToken(
    authorities: MutableCollection<out GrantedAuthority>,
) : AbstractAuthenticationToken(authorities), Serializable {

    private lateinit var siweCredentials: SiweCredentials
    private lateinit var userDetails: UserDetails

    override fun getCredentials(): Any {
        return this.siweCredentials
    }

    override fun getPrincipal(): Any {
        return this.userDetails
    }

    companion object {
        fun unAuthenticated(message: String, signature: String, userDetails: UserDetails): SiweAuthenticationToken {
            val siweAuthenticationToken = SiweAuthenticationToken(userDetails.authorities)
            siweAuthenticationToken.siweCredentials = SiweCredentials(message, signature)
            siweAuthenticationToken.userDetails = userDetails
            siweAuthenticationToken.isAuthenticated = false
            return siweAuthenticationToken
        }

        fun authenticated(siweCredentials: SiweCredentials, userDetails: UserDetails): SiweAuthenticationToken {
            val siweAuthenticationToken = SiweAuthenticationToken(userDetails.authorities)
            siweAuthenticationToken.siweCredentials = siweCredentials
            siweAuthenticationToken.userDetails = userDetails
            siweAuthenticationToken.isAuthenticated = true
            return siweAuthenticationToken
        }
    }

}