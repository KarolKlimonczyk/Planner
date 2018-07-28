package com.karolk.planner.event

import java.time.LocalDateTime

data class Event(val id: Long = 1,
                 val title: String = "",
                 val start: LocalDateTime = LocalDateTime.now(),
                 val end: LocalDateTime = LocalDateTime.now().plusHours(1)
)