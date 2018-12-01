package com.karolk.planner.user

import com.karolk.planner.event.Event
import org.codehaus.jackson.annotate.JsonManagedReference
import java.util.*
import javax.persistence.*

@Entity(name = "user")
data class User(
        @Id
        @Column(name = "id")
        //due it's a facebook id it has to be a string type
        val id: String,

        @Column(name = "name")
        val name: String,

        @JsonManagedReference
        @ManyToMany(mappedBy = "users", fetch = FetchType.LAZY)
        val events: List<Event> = Collections.emptyList()
)