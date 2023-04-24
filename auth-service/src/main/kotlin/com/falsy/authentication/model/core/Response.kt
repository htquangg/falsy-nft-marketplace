package com.falsy.authentication.model.core

import org.springframework.http.HttpStatus

/**
 * auth-service
 *
 * @author uuhnaut69
 *
 */
data class Response<T>(val status: Int, val data: T?) {

    companion object {

        fun <T> ok(data: T?): Response<T> {
            return Response(HttpStatus.OK.value(), data)
        }

    }

}