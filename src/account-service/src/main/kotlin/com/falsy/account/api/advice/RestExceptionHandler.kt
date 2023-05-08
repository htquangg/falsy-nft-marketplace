package com.falsy.account.api.advice

import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.reactive.result.method.annotation.ResponseEntityExceptionHandler

/**
 * auth-service
 *
 * @author uuhnaut69
 *
 */
@RestControllerAdvice
class RestExceptionHandler : ResponseEntityExceptionHandler() {

}
