package com.karolk.planner.user

import org.springframework.stereotype.Service

@Service
class UserService(private val userRepository: UserRepository) {

    fun getUserById(id: String) = this.userRepository.findById(id)

    fun saveUser(user: User) = this.userRepository.save(user)
}