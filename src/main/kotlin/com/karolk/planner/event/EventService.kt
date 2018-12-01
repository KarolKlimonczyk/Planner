package com.karolk.planner.event

import org.springframework.stereotype.Service

@Service
class EventService(private val eventRepository: EventRepository) {

    fun save(eventDto: EventDto) = this.eventRepository.save(eventDto.toEvent())

    fun findById(id: Long) = this.eventRepository.findById(id)

    fun findAll(): List<Event> = this.eventRepository.findAll()
}