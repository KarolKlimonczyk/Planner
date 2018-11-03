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
class UserAPI(private val userService: UserService) {

    @GetMapping("/logged")
    fun getLoggedUser(principal: Principal): User {
        val authentication = SecurityContextHolder.getContext().authentication
        val authenticationDetails = ((authentication as OAuth2Authentication).userAuthentication.details) as HashMap<*, *>
        val userId = authenticationDetails["id"] as String

        return userService.getUserById(userId)
                .orElse(userService.saveUser(User(userId, authenticationDetails["name"] as String, Collections.emptyList())))
    }
}