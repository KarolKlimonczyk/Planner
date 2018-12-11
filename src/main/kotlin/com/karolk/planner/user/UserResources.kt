package com.karolk.planner.user

import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.oauth2.provider.OAuth2Authentication
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.security.Principal
import java.util.*

@RestController
@RequestMapping("/api/user")
class UserResources(private val userService: UserService) {

    @GetMapping("/logged")
    fun getLoggedUser(principal: Principal): User {
        val authentication = SecurityContextHolder.getContext().authentication
        val authenticationDetails = ((authentication as OAuth2Authentication).userAuthentication.details) as HashMap<*, *>
        val userId = authenticationDetails["id"] as String

        val user = userService.getUserById(userId)

        if (user != null) {
            return user
        }
        return userService.saveUser(User(userId, authenticationDetails["name"] as String, Collections.emptyList()))
    }
}