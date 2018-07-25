package com.karolk.planner.event

import java.time.LocalDateTime

data class Event(val id: Long = 1,
                 val name: String = "",
                 val description: String = "",
                 val startDate: LocalDateTime = LocalDateTime.now(),
                 val endDate: LocalDateTime = LocalDateTime.now().plusHours(1)
)