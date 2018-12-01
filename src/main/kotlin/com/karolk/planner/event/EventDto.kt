package com.karolk.planner.event

import com.karolk.planner.user.UserDto
import com.karolk.planner.user.toUser
import java.time.LocalDateTime

data class EventDto(val title: String,
                    val start: LocalDateTime,
                    val end: LocalDateTime,
                    val users: List<UserDto>,
                    val color: String,
                    val allDay: Boolean,
                    val draggable: Boolean)

fun EventDto.toEvent() = Event(
        title = this.title,
        start = this.start,
        end = this.end,
        users = this.users.map(UserDto::toUser),
        color = this.color,
        allDay = this.allDay,
        draggable = this.draggable
)