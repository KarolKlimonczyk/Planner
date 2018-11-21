package com.karolk.planner.event

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@RestController
@RequestMapping("/api/event")
class EventResources(private val eventService: EventService) {

    @GetMapping(value = ["/{id}"])
    fun getEvent(@PathVariable id: Long) = this.eventService.findById(id)

    @PostMapping(value = ["/add"])
    fun addEvent(@RequestBody @Valid event: Event): ResponseEntity<Unit> {
        this.eventService.save(event)
        return ResponseEntity.ok().build()
    }
}