package com.falsy.authentication.model.core

import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.Id
import org.springframework.data.annotation.LastModifiedDate
import java.time.Instant
import java.util.*

/**
 * auth-service
 *
 * @author uuhnaut69
 *
 */
open class BaseEntity {

    @Id
    var id: UUID? = null

    @CreatedDate
    var createdDate: Instant? = null

    @LastModifiedDate
    var modifiedDate: Instant? = null

}