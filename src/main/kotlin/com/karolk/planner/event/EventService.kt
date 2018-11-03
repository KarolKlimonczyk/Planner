package com.karolk.planner.event

import org.springframework.stereotype.Service

@Service
class EventService(private val eventRepository: EventRepository) {

    fun save(event: Event) = this.eventRepository.save(event)

    fun findById(id: Long) = this.eventRepository.findById(id)
}