package com.karolk.planner.event

import com.karolk.planner.user.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.security.Principal
import javax.validation.Valid

@RestController
@RequestMapping("/api/event")
class EventResources(private val eventService: EventService, private val userService: UserService) {

    @GetMapping(value = ["/{id}"])
    fun getEvent(@PathVariable id: Long) = this.eventService.findById(id)

    @GetMapping(value = ["/all"])
    fun getAllUserEvents(principal: Principal) = this.userService.getUserById(principal.name)?.events?.let { ResponseEntity.ok(it) }

    @PostMapping(value = ["/add"])
    fun addEvent(@RequestBody @Valid event: EventDto): ResponseEntity<Unit> {
        this.eventService.save(event)
        return ResponseEntity.ok().build()
    }
}