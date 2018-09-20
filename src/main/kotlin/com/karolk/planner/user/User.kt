package com.karolk.planner.user

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id

@Entity(name = "User")
data class User(
        @Id
        @Column(name = "id")
        //due it's a facebook id it has to be a string type
        val id: String,

        @Column(name = "name")
        val name: String)