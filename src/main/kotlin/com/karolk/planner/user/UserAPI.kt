package com.karolk.planner.user

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.security.Principal

@RestController
@RequestMapping("/api/user")
class UserAPI {

    @GetMapping("/logged")
    fun getLoggedUser(principal: Principal) = principal
}