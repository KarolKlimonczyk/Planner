package com.karolk.planner.event

import com.fasterxml.jackson.annotation.JsonBackReference
import com.karolk.planner.user.User
import java.time.LocalDateTime
import javax.persistence.*
import javax.validation.constraints.Size

@Entity(name = "event")
data class Event(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id")
        val id: Long? = null,

        @Column(name = "title")
        @Size(max = 300)
        val title: String,

        @Column(name = "start")
        val start: LocalDateTime,

        @Column(name = "end")
        val end: LocalDateTime,

        @JsonBackReference
        @ManyToMany(fetch = FetchType.LAZY)
        @JoinTable(
                name = "event_user",
                joinColumns = [JoinColumn(name = "event_id")],
                inverseJoinColumns = [JoinColumn(name = "user_id")]
        )
        val users: List<User>,

        @Column(name = "color")
        val color: String,

        @Column(name = "all_day")
        val allDay: Boolean,

        @Column(name = "draggable")
        val draggable: Boolean
)