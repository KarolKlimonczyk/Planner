package com.karolk.planner.event

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/event")
class EventAPI {

    @GetMapping(value = ["/{id}"])
    fun getEvent(@PathVariable id: Long): Event {
        return Event()
    }

    @PostMapping(value = ["/add"])
    fun addEvent(@RequestBody event: Event): ResponseEntity<Unit>{
        return ResponseEntity.ok().build()
    }
}