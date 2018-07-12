package com.karolk.planner

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class PlannerApplication

fun main(args: Array<String>) {
    runApplication<PlannerApplication>(*args)
}
