package com.karolk.planner.user

import org.springframework.stereotype.Service

@Service
class UserService(private val userRepository: UserRepository) {

    fun getUserById(id: String) : User? = this.userRepository.findOne(id)

    fun saveUser(user: User) = this.userRepository.save(user)
}