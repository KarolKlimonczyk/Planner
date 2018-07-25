package com.karolk.planner.event

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/event")
class EventAPI {

    @GetMapping(value = ["/{id}"])
    fun getEvent(@PathVariable id: Long): Event {
        return Event()
    }
}