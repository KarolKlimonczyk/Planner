package com.karolk.planner.user

import com.karolk.planner.event.EventDto
import java.util.*

data class UserDto(val id: String,
                   val name: String,
                   val events: List<EventDto> = Collections.emptyList())

fun UserDto.toUser() = User(
        id = this.id,
        name = this.name
)