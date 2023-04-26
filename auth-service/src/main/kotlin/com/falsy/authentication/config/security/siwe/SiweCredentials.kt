package com.falsy.authentication.config.security.siwe

import java.io.Serializable

/**
 * auth-service
 *
 * @author uuhnaut69
 *
 */
data class SiweCredentials(val message: String, val signature: String) : Serializable
